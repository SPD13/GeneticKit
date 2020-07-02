/*
Classes used to store application objects
 */

class Gene {
    Size = 0;
    EntryNumber = 0;

    GeneType = -1;
    GeneSubType = -1;
    GeneId = -1;
    Generation = -1;
    SwitchOnTime = -1;
    Flags = -1;
    MutabilityWeighting = -1;
    ExpressionVariant = -1;

    //Flags
    Mutable = false;
    Duplicable = false;
    Deletable = false;
    MaleOnly = false;
    FemaleOnly = false;
    NotExpressed = false;

    GeneNoteObj = null;

    //Specialization: Organ, Brain Lobe, etc...
    SpecialiazedObj = null;

    Variant = 0; //Don't know where it's coming from...

    constructor(bytes, entry_number) {
        this.readFromBytes(bytes);
        this.EntryNumber = entry_number;
    }

    readFromBytes(bytes) {
        this.GeneType = bytes[0];
        this.GeneSubType = bytes[1];
        this.GeneId = bytes[2];
        this.Generation = bytes[3];
        this.SwitchOnTime = bytes[4];
        this.Flags = bytes[5];
        this.readFlags();
        this.MutabilityWeighting = bytes[6];
        this.ExpressionVariant = bytes[7];
        this.Size = bytes.length;

        //Specialized object
        if (this.GeneType == 0) {
            //Brain
            if (this.GeneSubType == 0) {
                //BrainLobe
                this.SpecialiazedObj = new GeneBrainLobe(bytes.slice(8,-1));
            }
        }
    }

    getBytes() {
        //Update flag fields
        this.writeFlags();
        var byteArray = [intTo1Byte(this.GeneType), intTo1Byte(this.GeneSubType), intTo1Byte(this.GeneId), intTo1Byte(this.Generation), intTo1Byte(this.SwitchOnTime), intTo1Byte(this.Flags), intTo1Byte(this.MutabilityWeighting), intTo1Byte(this.Expression)];
        return byteArray;
    }

    //Read flags based on the bits values
    readFlags() {
        this.Mutable = (this.Flags & (1 << 0));
        this.Duplicable = (this.Flags & (1 << 1));
        this.Deletable = (this.Flags & (1 << 2));
        this.MaleOnly = (this.Flags & (1 << 3));
        this.FemaleOnly = (this.Flags & (1 << 4));
        this.NotExpressed = (this.Flags & (1 << 5));
    }

    writeFlags() {
        updateBit(this.Flags, 0, this.Mutable);
        updateBit(this.Flags, 1, this.Duplicable);
        updateBit(this.Flags, 2, this.Deletable);
        updateBit(this.Flags, 3, this.MaleOnly);
        updateBit(this.Flags, 4, this.FemaleOnly);
        updateBit(this.Flags, 5, this.NotExpressed);
    }

    typeString() {
        return GeneTypes_str[this.GeneType] + ">" + GeneSubTypes_str[this.GeneType][this.GeneSubType];
    }

    switchOnString() {
        return SwitchOn_str[this.SwitchOnTime];
    }

    sexString() {
        if (this.MaleOnly) {
            return "m";
        } else if (this.FemaleOnly) {
            return "f";
        }
        return "-";
    }

    descriptionString() {
        if (this.GeneNoteObj) {
            return this.GeneNoteObj.Caption;
        }
        return "";
    }

    setGeneNote(GeneNoteObj) {
        this.GeneNoteObj = GeneNoteObj;
    }

    toString() {
        return "Gene #" + this.EntryNumber + ": " + this.GeneId + " - (" + this.typeString() + ")";
    }
}

class SVcode {
    Opcode = null;
    Operand = null;
    Value = null;

    constructor(bytes) {
        this.readFromBytes(bytes);
    }

    readFromBytes(bytes) {
        this.Opcode = bytes[0];
        this.Operand = bytes[1];
        this.Value = bytes[2];
    }

}

class SVRule {
    Codes = [];

    constructor(bytes) {
        this.readFromBytes(bytes);
    }

    readFromBytes(bytes) {
        var cursor = 0;
        for (var i = 0; i < 16; i++) {
            this.Codes.push(new SVcode(bytes.slice(cursor, cursor + 3)));
            cursor += 3;
        }
    }
}

class GeneBrainLobe {
    LobeId = null;
    UpdateTime = null;
    X = null;
    Y = null;
    Width = null;
    Height = null;
    Red = null;
    Green = null;
    Blue = null;
    WTA = null;
    Tissue = null;
    Spare = [];
    InitSVRule = null;
    UpdateSVRule = null;

    constructor(bytes, entry_number) {
        this.readFromBytes(bytes);
        this.EntryNumber = entry_number;
    }

    readFromBytes(bytes) {
        this.LobeId = String.fromCharCode.apply(null, bytes.slice(0, 4));
        this.UpdateTime = intFromBytes(bytes.slice(4, 6));
        this.X = intFromBytes(bytes.slice(6, 8));
        this.Y = intFromBytes(bytes.slice(8, 10));
        this.Width = bytes[10];
        this.Height = bytes[11];
        this.Red = bytes[12];
        this.Green = bytes[13];
        this.Blue = bytes[14];
        this.WTA = bytes[15];
        this.Tissue = bytes[16];
        this.Spare = bytes.slice(17, 26);
        this.InitSVRule = new SVRule(bytes.slice(26, 75));
        this.UpdateSVRule = new SVRule(bytes.slice(75, 124));
    }
}

class SVNote {
    GeneType = -1;
    GeneSubType = -1;
    UniqueId = -1;
    RuleNumber = -1;
    Annotations = [];
    GeneralNotes = "";

    constructor(bytes) {
        this.readFromBytes(bytes);
    }

    readFromBytes(bytes) {
        this.GeneType = intFromBytes(bytes.slice(0, 2));
        this.GeneSubType = intFromBytes(bytes.slice(2, 4));
        this.UniqueId = intFromBytes(bytes.slice(4, 6));
        this.RuleNumber = intFromBytes(bytes.slice(6, 8));
        var dummy = intFromBytes(bytes.slice(8, 10));
        if (dummy != 0) {
            console.log("ERROR: V1=" + dummy);
        }
        var cursor = 10;
        for (var i = 0; i < 16; i++) {
            var len = intFromBytes(bytes.slice(cursor, cursor + 2));
            cursor += 2;
            this.Annotations.push(String.fromCharCode.apply(null, bytes.slice(cursor, cursor + len)));
            cursor += len;
            if (len > 0) {
                console.log("AN(" + len + "):" + this.Annotations[this.Annotations.length - 1]);
            }
        }
        dummy = intFromBytes(bytes.slice(cursor, cursor + 2));
        cursor += 2;
        if (dummy != 0) {
            console.log("ERROR: V2=" + dummy);
        }
        len = intFromBytes(bytes.slice(cursor, cursor + 2));
        cursor += 2;
        this.GeneralNotes = String.fromCharCode.apply(null, bytes.slice(cursor, cursor + len));
        cursor += len;
        /*if (len>0) {
                console.log("GN("+len+"):" + this.GeneralNotes);
            }*/
        if (this.GeneralNotes.includes("Keep balance between vi")) {
            console.log("ERROR: " + len);
        }
    }

    dumpBytes(bytes) {
        var output_string = "";
        for (var i = 0; i < bytes.length; i += 2) {
            output_string += i + ": " + intFromBytes(bytes.slice(i, i + 1)) + ", ";
        }

        return output_string;
    }
}

class GeneNote {
    GeneType = -1;
    GeneSubType = -1;
    UniqueId = -1;
    Caption = "";
    RichText = "";

    constructor(bytes) {
        this.readFromBytes(bytes);
    }

    readFromBytes(bytes) {
        this.GeneType = intFromBytes(bytes.slice(0, 2));
        this.GeneSubType = intFromBytes(bytes.slice(2, 4));
        this.UniqueId = intFromBytes(bytes.slice(4, 6));
        var cursor = 8;
        var len = intFromBytes(bytes.slice(cursor, cursor + 2));
        cursor += 2;
        this.Caption = String.fromCharCode.apply(null, bytes.slice(cursor, cursor + len));
        cursor += len;
        /*   if (len>0) {
               console.log("GN Caption("+len+"):" + this.GeneType + "|" + this.GeneSubType + "|" + this.UniqueId + "|" + this.Caption);
           }*/
        len = intFromBytes(bytes.slice(cursor, cursor + 2));
        cursor += 2;
        this.RichText = String.fromCharCode.apply(null, bytes.slice(cursor, cursor + len));
        /*if (len>0) {
                console.log("GN RichText("+len+"):" + this.GeneType + "|" + this.GeneSubType + "|" + this.UniqueId + "|" + this.Caption);
            }*/
    }
}