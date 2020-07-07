//UI: Modal boxes
var edited_gene = null;

$( document ).ready(function() {
    initUI();
});

function initUI() {
    //Gene header
    $('#geneModalGeneHeader').append($('#geneHeader'));
    //Programmatically replicate SVRules controls
    //Lobe UI
    $('#lobe-input-svrule').append(initUISVRule("lobe_input"));
    $('#lobe-update-svrule').append(initUISVRule("lobe_update"));
    //Tracts UI
    $('#lobetract-connectivity').append(initUITractConnection("lobetract_connection_start", "Source Lobe"));
    $('#lobetract-connectivity').append(initUITractConnection("lobetract_connection_end", "Destination Lobe"));
    $('#lobetract-input-svrule').append(initUISVRule("lobetract_input"));
    $('#lobetract-update-svrule').append(initUISVRule("lobetract_update"));
    //Chemical Receptor
    fillSelectWithChemicals($('#biochemistryReceptorChemical'));
}

function initUISVRule(prefix) {
    rule = $('#SVRule').clone();
    rule.attr("id", prefix+"_svrule");
    rule.find('textarea[name=svrule_comment]').attr("id", prefix+"_svrule_general_comment");
    for (var i=0; i<16; i++) {
        //Init Lobe SVRule
        rulecode = $('#SVRuleCode').clone();
        rulecode.find('div[name=svrule_label]').html("Line " + (i + 1));
        rulecode.find('div[name=svrule_label]').attr("id", prefix+"_svrule_label_" + i);
        rulecode.find('select[name=svrule_opcode]').attr("id", prefix+"_svrule_opcode_" + i);
        rulecode.find('select[name=svrule_opcode]').attr("gk-index", i);
        rulecode.find('select[name=svrule_opcode]').attr("gk-prefix", prefix+"_svrule");
        rulecode.find('select[name=svrule_opcode]').change(function () {
            updateSVCodeSelectorOp($(this));
        });
        rulecode.find('select[name=svrule_operand]').attr("id", prefix+"_svrule_operand_" + i);
        rulecode.find('select[name=svrule_operand]').attr("gk-index", i);
        rulecode.find('select[name=svrule_operand]').attr("gk-prefix", prefix+"_svrule_value");
        rulecode.find('select[name=svrule_operand]').change(function () {
            updateSVCodeSelectorVal($(this), false);
            var prefix = $(this).attr("gk-prefix");
            var index = $(this).attr("gk-index");
            updateSVCodeValueLabel($('#'+prefix + index + "_number"));
        });
        rulecode.find('select[name=svrule_value_select]').attr("id", prefix+"_svrule_value_" + i + "_select");
        rulecode.find('input[name=svrule_value_number]').attr("id", prefix+"_svrule_value_" + i + "_number");
        rulecode.find('input[name=svrule_value_number]').attr("gk-index", i);
        rulecode.find('input[name=svrule_value_number]').attr("gk-prefix", prefix+"_svrule_value");
        rulecode.find('input[name=svrule_value_number]').change(function () {
            updateSVCodeValueLabel($(this));
        });
        rulecode.find('span[name=svrule_value_number_label]').attr("id", prefix+"_svrule_value_" + i + "_number_label");
        rulecode.find('input[name=svrule_comment]').attr("id", prefix+"_svrule_comment_" + i);
        rule.find('div[name=svrule_code]').append(rulecode);
    }
    return rule;
}

function initUITractConnection(prefix, label) {
    var tract_connection = $("#brainTractConnection").clone();
    tract_connection.find('h5[name=brainTractConnectionTitle]').html(label);
    tract_connection.find('select[name=brainTractConnectionLobeId]').attr("id", prefix+"_lobeid");
    tract_connection.find('select[name=brainTractConnectionLobeId]').attr("gk-prefix", prefix);
    tract_connection.find('select[name=brainTractConnectionLobeId]').change(function () {
        adjustTractConnectionRange($(this));
    });
    fillSelectWithArray(tract_connection.find('select[name=brainTractConnectionLobeId]'), Object.keys(LobeId_str));
    tract_connection.find('input[name=brainTractConnectionNbConnections]').attr("id", prefix+"_nbconnections");
    tract_connection.find('select[name=brainTractConnectionNGFState]').attr("id", prefix+"_ngfstate");
    fillSelectWithValues(tract_connection.find('select[name=brainTractConnectionNGFState]'), NeuronVariable_str);
    tract_connection.find('span[name=brainTractConnectionStartNeuron_label]').attr("id", prefix+"_startneuron_label");
    tract_connection.find('input[name=brainTractConnectionStartNeuron]').attr("id", prefix+"_startneuron");
    tract_connection.find('input[name=brainTractConnectionStartNeuron]').attr("gk-prefix", prefix);
    tract_connection.find('input[name=brainTractConnectionStartNeuron]').change(function () {
        var prefix = $(this).attr("gk-prefix");
        $("#"+prefix+"_startneuron_label").html($("#"+prefix+"_startneuron").val());
    });
    tract_connection.find('span[name=brainTractConnectionEndNeuron_label]').attr("id", prefix+"_endneuron_label");
    tract_connection.find('input[name=brainTractConnectionEndNeuron]').attr("id", prefix+"_endneuron");
    tract_connection.find('input[name=brainTractConnectionEndNeuron]').attr("gk-prefix", prefix);
    tract_connection.find('input[name=brainTractConnectionEndNeuron]').change(function () {
        var prefix = $(this).attr("gk-prefix");
        $("#"+prefix+"_endneuron_label").html($("#"+prefix+"_endneuron").val());
    });
    return tract_connection;
}

function fillSelectWithValues(select_obj, string_table) {
    select_obj.empty();
    for (var i=0; i< string_table.length; i++) {
        var o = new Option(string_table[i], i);
        $(o).html(string_table[i]);// jquerify the DOM object 'o' so we can use the html method
        select_obj.append(o);
    }
}

function fillSelectWithArray(select_obj, array) {
    select_obj.empty();
    for (var i=0; i< array.length; i++) {
        var o = new Option(array[i], array[i]);
        $(o).html(array[i]);// jquerify the DOM object 'o' so we can use the html method
        select_obj.append(o);
    }
}

function fillSelectWithChemicals(select_obj) {
    select_obj.empty();
    for (var i=0; i< Chemicals_str.length; i++) {
        var str = Chemicals_str[i];
        if (str == "") {
            str = "Unused Chemical "+i;
        }
        var o = new Option(str, i);
        $(o).html(str);// jquerify the DOM object 'o' so we can use the html method
        select_obj.append(o);
    }
}

function adjustTractConnectionRange(lobeId_select) {
    var prefix = lobeId_select.attr("gk-prefix");
    var max = getLobeNeuronsSize(lobeId_select.val());
    $("#"+prefix+"_startneuron").attr('min', 0);
    $("#"+prefix+"_startneuron").attr('max', max);
    $("#"+prefix+"_startneuron").val(0);
    $("#"+prefix+"_startneuron").change();
    $("#"+prefix+"_endneuron").attr('min', 0);
    $("#"+prefix+"_endneuron").attr('max', max);
    $("#"+prefix+"_endneuron").val(max);
    $("#"+prefix+"_endneuron").change();
}

function updateSVCodeSelectorOp(opcode_select){
    var index = opcode_select.attr("gk-index");
    var prefix = opcode_select.attr("gk-prefix");
    if (opcode_select.val() == 0) {
        //Stop: No other options
        $("#" + prefix + "_operand_" + index).val(0);
        $("#" + prefix + "_operand_" + index).change();
        $("#" + prefix + "_operand_" + index).hide();
    } else {
        $("#" + prefix + "_operand_" + index).show();
    }
}

function updateSVCodeValueLabel(number_input) {
    var index = number_input.attr("gk-index");
    var prefix = number_input.attr("gk-prefix");
    prefix = prefix + "_" + index;
    $("#"+prefix+"_number_label").html($("#"+prefix+"_number").val());
}

function updateSVCodeSelectorVal(operand_select, value){
    var operand = operand_select.val();
    var index = operand_select.attr("gk-index");
    var prefix = operand_select.attr("gk-prefix");
    prefix = prefix + "_" + index;
    if (operand == 0 || operand == 5 || operand == 9 || operand == 10) {
        //No Value
        $("#"+prefix+"_select").hide();
        $("#"+prefix+"_number").hide();
        $("#"+prefix+"_number_label").hide();
    } else if (operand == 1 || operand == 3 || operand == 4) {
        //Neuron
        fillSelectWithValues($("#"+prefix+"_select"), NeuronVariable_str);
        $("#"+prefix+"_select").show();
        $("#"+prefix+"_number").hide();
        $("#"+prefix+"_number_label").hide();
        if (value) {
            $("#"+prefix+"_select").val(value);
        }
    } else if (operand == 2) {
        //Dendrite
        fillSelectWithValues($("#"+prefix+"_select"), DendriteVariable_str);
        $("#"+prefix+"_select").show();
        $("#"+prefix+"_number").hide();
        $("#"+prefix+"_number_label").hide();
        if (value) {
            $("#"+prefix+"_select").val(value);
        }
    } else if (operand == 6 || operand == 7 || operand == 8) {
        //Chemical
        //TODO: Fill with chemicals list
        $("#"+prefix+"_select").show();
        $("#"+prefix+"_number").hide();
        $("#"+prefix+"_number_label").hide();
        if (value) {
            $("#"+prefix+"_select").val(value);
        }
    } else if (operand >= 11) {
        //Value
        $("#"+prefix+"_select").hide();
        $("#"+prefix+"_number").show();
        $("#"+prefix+"_number_label").show();
        if (operand == 11) {
            //value
            $("#"+prefix+"_number").attr('min', 0);
            $("#"+prefix+"_number").attr('max', 1);
            $("#"+prefix+"_number").attr('step', 0.004);
        } else if (operand == 12) {
            //negative value
            $("#"+prefix+"_number").attr('min', -1);
            $("#"+prefix+"_number").attr('max', 0);
            $("#"+prefix+"_number").attr('step', -0.004);
        } else if (operand == 13) {
            //value x10
            $("#"+prefix+"_number").attr('min', 0);
            $("#"+prefix+"_number").attr('max', 10);
            $("#"+prefix+"_number").attr('step', 0.0403);
        } else if (operand == 14) {
            //value /10
            $("#"+prefix+"_number").attr('min', 0);
            $("#"+prefix+"_number").attr('max', 0.1);
            $("#"+prefix+"_number").attr('step', 0.0004);
        } else if (operand == 15) {
            //value integer
            $("#"+prefix+"_number").attr('min', 0);
            $("#"+prefix+"_number").attr('max', 248);
            $("#"+prefix+"_number").attr('step', 1);
        }
        if (value) {
            $("#"+prefix+"_number").val(value);
        }
    }
}

function updateRangeLabel(range_obj) {
    var label_obj = $("#"+range_obj.attr("gk-label"));
    if (label_obj) {
        label_obj.html(range_obj.val());
    }
}

function refreshLobeLabel() {
    if (LobeId_str[$('#lobeID').val()]) {
        $('#lobeLabel').html(LobeId_str[$('#lobeID').val()]);
    } else {
        $('#lobeLabel').html("User defined lobe");
    }
}

function startGeneModal(gene_obj) {
    //Modal Label
    label = "(# " + gene_obj.EntryNumber + ")";
    if (gene_obj.GeneNoteObj) {
        label += " "+gene_obj.GeneNoteObj.Caption+" ";
    }
    label += " ("+gene_obj.typeString()+")";
    $('#geneModalLabel').html(label);

    //Header values
    $('#headerAge').val(gene_obj.SwitchOnTime);
    if (gene_obj.Duplicable) {
        $('#headerDup').prop('checked', true);
    } else {
        $('#headerDup').prop('checked', false);
    }
    if (gene_obj.Mutable) {
        $('#headerMut').prop('checked', true);
    } else {
        $('#headerMut').prop('checked', false);
    }
    $('#headerDegree').val(gene_obj.MutabilityWeighting);
    if (gene_obj.Deletable) {
        $('#headerCut').prop('checked', true);
    } else {
        $('#headerCut').prop('checked', false);
    }
    if (gene_obj.MaleOnly) {
        $('input:radio[name=headerSex]').filter('[value=B]').prop('checked', false);
        $('input:radio[name=headerSex]').filter('[value=M]').prop('checked', true);
        $('input:radio[name=headerSex]').filter('[value=F]').prop('checked', false);
    } else if (gene_obj.FemaleOnly) {
        $('input:radio[name=headerSex]').filter('[value=B]').prop('checked', false);
        $('input:radio[name=headerSex]').filter('[value=M]').prop('checked', false);
        $('input:radio[name=headerSex]').filter('[value=F]').prop('checked', true);
    } else {
        $('input:radio[name=headerSex]').filter('[value=B]').prop('checked', true);
        $('input:radio[name=headerSex]').filter('[value=M]').prop('checked', false);
        $('input:radio[name=headerSex]').filter('[value=F]').prop('checked', false);
    }
    if (gene_obj.NotExpressed) {
        $('#headerNotExpressed').prop('checked', true);
    } else {
        $('#headerNotExpressed').prop('checked', false);
    }
    $('#headerVariant').val(gene_obj.ExpressionVariant);
    //Gene notes
    if (gene_obj.GeneNoteObj) {
        $('#geneNotes').val(gene_obj.GeneNoteObj.RichText);
    }

    //Specialized UI
    if (gene_obj.GeneType == 0 && gene_obj.GeneSubType == 0) {
        //Brain Lobe
        $('#geneModalSpecialized').append($('#geneLobe'));
        $('#lobeID').val(gene_obj.SpecialiazedObj.LobeId);
        refreshLobeLabel();
        $('#lobeX').val(gene_obj.SpecialiazedObj.X);
        $('#lobeY').val(gene_obj.SpecialiazedObj.Y);
        $('#lobeWidth').val(gene_obj.SpecialiazedObj.Width);
        $('#lobeHeight').val(gene_obj.SpecialiazedObj.Height);
        $('#lobeColourR').val(gene_obj.SpecialiazedObj.Red);
        $('#lobeColourG').val(gene_obj.SpecialiazedObj.Green);
        $('#lobeColourB').val(gene_obj.SpecialiazedObj.Blue);
        $('#lobeTissueID').val(gene_obj.SpecialiazedObj.Tissue);
        $('#lobeWTA').val(gene_obj.SpecialiazedObj.WTA);
        $('#lobeUpdateTime').val(gene_obj.SpecialiazedObj.UpdateTime);
        if (gene_obj.SpecialiazedObj.Spare[0]) {
            $('#lobeInitRuleRunsAlways').prop('checked', true);
        } else {
            $('#lobeInitRuleRunsAlways').prop('checked', false);
        }
        //SVRules
        loadSVRuleIntoUI("lobe_input", gene_obj.SpecialiazedObj.InitSVRule);
        loadSVRuleIntoUI("lobe_update", gene_obj.SpecialiazedObj.UpdateSVRule);
    } else if ((gene_obj.GeneType == 0 && gene_obj.GeneSubType == 1) || (gene_obj.GeneType == 3 && gene_obj.GeneSubType == 0)) {
        //Brain organ or Organ
        $('#geneModalSpecialized').append($('#geneOrgan'));
        $('#organClockRate').val(gene_obj.SpecialiazedObj.ClockRate);
        $('#organClockRate').change();
        $('#organRepairRate').val(gene_obj.SpecialiazedObj.RepairRate);
        $('#organRepairRate').change();
        $('#organLifeForce').val(gene_obj.SpecialiazedObj.LifeForce);
        $('#organLifeForce').change();
        $('#organBioTickStart').val(gene_obj.SpecialiazedObj.BioTickStart);
        $('#organBioTickStart').change();
        $('#organATPDamageCoeff').val(gene_obj.SpecialiazedObj.ATPDamageCoEff);
        $('#organATPDamageCoeff').change();
    } else if (gene_obj.GeneType == 0 && gene_obj.GeneSubType == 2) {
        //Brain tract
        $('#geneModalSpecialized').append($('#geneLobeTract'));
        $('#lobetractUpdateTime').val(gene_obj.SpecialiazedObj.UpdateTime);
        $('#lobetract_connection_start_lobeid').val(gene_obj.SpecialiazedObj.SourceLobeId);
        $('#lobetract_connection_start_lobeid').change();
        $('#lobetract_connection_start_startneuron').val(gene_obj.SpecialiazedObj.SourceLobeLowerBound);
        $('#lobetract_connection_start_startneuron').change();
        $('#lobetract_connection_start_endneuron').val(gene_obj.SpecialiazedObj.SourceLobeUpperBound);
        $('#lobetract_connection_start_endneuron').change();
        $('#lobetract_connection_start_nbconnections').val(gene_obj.SpecialiazedObj.SourceNBConnections);
        $('#lobetract_connection_end_lobeid').val(gene_obj.SpecialiazedObj.DestinationLobeId);
        $('#lobetract_connection_end_lobeid').change();
        $('#lobetract_connection_end_startneuron').val(gene_obj.SpecialiazedObj.DestinationLobeLowerBound);
        $('#lobetract_connection_end_startneuron').change();
        $('#lobetract_connection_end_endneuron').val(gene_obj.SpecialiazedObj.DestinationLobeUpperBound);
        $('#lobetract_connection_end_endneuron').change();
        $('#lobetract_connection_end_nbconnections').val(gene_obj.SpecialiazedObj.DestinationNBConnections);

        if (gene_obj.SpecialiazedObj.UseRandom) {
            $('input:radio[name=lobetract-migration]').filter('[value=0]').prop('checked', true);
            $('input:radio[name=lobetract-migration]').filter('[value=1]').prop('checked', false);
        } else {
            $('input:radio[name=lobetract-migration]').filter('[value=0]').prop('checked', false);
            $('input:radio[name=lobetract-migration]').filter('[value=1]').prop('checked', true);
        }
        if (gene_obj.SpecialiazedObj.NoConnectionsIsRandom) {
            $('input:radio[name=lobetract-connections]').filter('[value=0]').prop('checked', true);
            $('input:radio[name=lobetract-connections]').filter('[value=1]').prop('checked', false);
        } else {
            $('input:radio[name=lobetract-connections]').filter('[value=0]').prop('checked', false);
            $('input:radio[name=lobetract-connections]').filter('[value=1]').prop('checked', true);
        }

        //SVRules
        loadSVRuleIntoUI("lobetract_input", gene_obj.SpecialiazedObj.InitSVRule);
        loadSVRuleIntoUI("lobetract_update", gene_obj.SpecialiazedObj.UpdateSVRule);
    } else if (gene_obj.GeneType == 1 && gene_obj.GeneSubType == 0) {
        //Biochemistry Receptor
        $('#geneModalSpecialized').append($('#geneBiochemistryReceptor'));
        $('#biochemistryReceptorOrgan').val(gene_obj.SpecialiazedObj.Organ);
        $('#biochemistryReceptorTissue').val(gene_obj.SpecialiazedObj.Tissue);
        $('#biochemistryReceptorLocus').val(gene_obj.SpecialiazedObj.Locus);
        $('#biochemistryReceptorChemical').val(gene_obj.SpecialiazedObj.Chemical);
        $('#biochemistryReceptorThreshold').val(gene_obj.SpecialiazedObj.Threshold);
        $('#biochemistryReceptorThreshold').change();
        $('#biochemistryReceptorNominal').val(gene_obj.SpecialiazedObj.Nominal);
        $('#biochemistryReceptorNominal').change();
        $('#biochemistryReceptorGain').val(gene_obj.SpecialiazedObj.Gain);
        $('#biochemistryReceptorGain').change();
        if (gene_obj.SpecialiazedObj.Inverted) {
            $('#biochemistryReceptorFlags1').prop('checked', true);
        } else {
            $('#biochemistryReceptorFlags1').prop('checked', false);
        }
        if (gene_obj.SpecialiazedObj.Digital) {
            $('#biochemistryReceptorFlags2').prop('checked', true);
        } else {
            $('#biochemistryReceptorFlags2').prop('checked', false);
        }
    }

    edited_gene = gene_obj;
    $('#geneModal').modal();
}

function loadSVRuleIntoUI(prefix, SVRuleObj) {
    for (var i=0; i<16; i++) {
        //Init SV Rule
        if (i < SVRuleObj.Codes.length) {
            code = SVRuleObj.Codes[i];
            $('#' + prefix + '_svrule_opcode_' + i).val(code.Opcode);
            $('#' + prefix + '_svrule_operand_' + i).val(code.Operand);
            updateSVCodeSelectorVal($('#' + prefix + '_svrule_operand_' + i), code.Value);
            updateSVCodeValueLabel($('#' + prefix + '_svrule_value_' + i + "_number"));
            updateSVCodeSelectorOp($('#' + prefix + '_svrule_opcode_' + i));
            if (SVRuleObj.SVNoteObj && i < SVRuleObj.SVNoteObj.Annotations.length) {
                $('#' + prefix + '_svrule_comment_' + i).val(SVRuleObj.SVNoteObj.Annotations[i]);
            }
        }
    }
    if (SVRuleObj.SVNoteObj && SVRuleObj.SVNoteObj.GeneralNotes) {
        $('#'+prefix+'_svrule_general_comment').val(SVRuleObj.SVNoteObj.GeneralNotes);
    }
}

function saveSVRuleFromUI(prefix, SVRuleObj) {
    for (var i = 0; i < 16; i++) {
        //Init rule
        var code = SVRuleObj.Codes[i];
        code.Opcode = $('#'+prefix+'_svrule_opcode_' + i).val();
        code.Operand = $('#'+prefix+'_svrule_operand_' + i).val();
        if (code.Operand == 0 || code.Operand == 5 || code.Operand == 9 || code.Operand == 10) {
            code.Value = 0;
        } else if (code.Operand < 11) {
            code.Value = $('#'+prefix+'_svrule_value_' + i + "_select").val();
        } else {
            code.Value = $('#'+prefix+'_svrule_value_' + i + "_number").val();
        }
        //SVNote
        note_obj = SVRuleObj.SVNoteObj;
        if (!note_obj) {
            note_obj = new SVNote(null);
            SVRuleObj.SVNoteObj = note_obj;
        }
        note_obj.Annotations[i] = $('#'+prefix+'_svrule_comment_' + i).val();
    }
    //SVRules General notes
    SVRuleObj.SVNoteObj.GeneralNotes = $('#'+prefix+'_svrule_general_comment').val();
}

function saveGeneModal() {
    if (edited_gene) {
        edited_gene.SwitchOnTime = $('#headerAge').val();
        if ($('#headerDup').prop('checked')) {
            edited_gene.Duplicable = true;
        } else {
            edited_gene.Duplicable = false;
        }
        if ($('#headerMut').prop('checked')) {
            edited_gene.Mutable = true;
        } else {
            edited_gene.Mutable = false;
        }
        edited_gene.MutabilityWeighting = $('#headerDegree').val();
        if ($('#headerCut').prop('checked')) {
            edited_gene.Deletable = true;
        } else {
            edited_gene.Deletable = false;
        }
        var sex = $("input:radio[name ='headerSex']:checked").val();
        if (sex == "M") {
            edited_gene.MaleOnly = true;
            edited_gene.FemaleOnly = false;
        } else if (sex == "F") {
            edited_gene.MaleOnly = false;
            edited_gene.FemaleOnly = true;
        } else {
            edited_gene.MaleOnly = false;
            edited_gene.FemaleOnly = false;
        }
        if ($('#headerNotExpressed').prop('checked')) {
            edited_gene.NotExpressed = true;
        } else {
            edited_gene.NotExpressed = false;
        }
        edited_gene.ExpressionVariant = $('#headerVariant').val();
        //Gene note
        note_obj = edited_gene.GeneNoteObj;
        if (!note_obj) {
            note_obj = new GeneNote(null);
            edited_gene.GeneNoteObj = note_obj;
        }
        note_obj.RichText = $('#geneNotes').val();

        if (edited_gene.GeneType == 0 && edited_gene.GeneSubType == 0) {
            //Brain Lobe
            edited_gene.SpecialiazedObj.LobeId = $('#lobeID').val();
            edited_gene.SpecialiazedObj.X = $('#lobeX').val();
            edited_gene.SpecialiazedObj.Y = $('#lobeY').val();
            edited_gene.SpecialiazedObj.Width = $('#lobeWidth').val();
            edited_gene.SpecialiazedObj.Height = $('#lobeHeight').val();
            edited_gene.SpecialiazedObj.Red = $('#lobeColourR').val();
            edited_gene.SpecialiazedObj.Green = $('#lobeColourG').val();
            edited_gene.SpecialiazedObj.Blue = $('#lobeColourB').val();
            edited_gene.SpecialiazedObj.Tissue = $('#lobeTissueID').val();
            edited_gene.SpecialiazedObj.UpdateTime = $('#lobeUpdateTime').val();
            edited_gene.SpecialiazedObj.WTA = $('#lobeWTA').val();
            if ($('#lobeInitRuleRunsAlways').prop('checked')) {
                edited_gene.SpecialiazedObj.Spare[0] = 1;
            } else {
                edited_gene.SpecialiazedObj.Spare[0] = 0;
            }
            //SVRules
            saveSVRuleFromUI("lobe_input", edited_gene.SpecialiazedObj.InitSVRule);
            saveSVRuleFromUI("lobe_update", edited_gene.SpecialiazedObj.UpdateSVRule);
        } else if ((edited_gene.GeneType == 0 && edited_gene.GeneSubType == 1) || (edited_gene.GeneType == 3 && edited_gene.GeneSubType == 0)) {
            //Brain Organ or Organ
            edited_gene.SpecialiazedObj.ClockRate = $('#organClockRate').val();
            edited_gene.SpecialiazedObj.RepairRate = $('#organRepairRate').val();
            edited_gene.SpecialiazedObj.LifeForce = $('#organLifeForce').val();
            edited_gene.SpecialiazedObj.BioTickStart= $('#organBioTickStart').val();
            edited_gene.SpecialiazedObj.ATPDamageCoEff = $('#organATPDamageCoeff').val();
        } else if (edited_gene.GeneType == 0 && edited_gene.GeneSubType == 2) {
            //Brain Tract
            edited_gene.SpecialiazedObj.UpdateTime = $('#lobetractUpdateTime').val();
            edited_gene.SpecialiazedObj.SourceLobeId = $('#lobetract_connection_start_lobeid').val();
            edited_gene.SpecialiazedObj.SourceLobeLowerBound = $('#lobetract_connection_start_startneuron').val();
            edited_gene.SpecialiazedObj.SourceLobeUpperBound = $('#lobetract_connection_start_endneuron').val();
            edited_gene.SpecialiazedObj.SourceNBConnections = $('#lobetract_connection_start_nbconnections').val();
            edited_gene.SpecialiazedObj.DestinationLobeId = $('#lobetract_connection_end_lobeid').val();
            edited_gene.SpecialiazedObj.DestinationLobeLowerBound = $('#lobetract_connection_end_startneuron').val();
            edited_gene.SpecialiazedObj.DestinationLobeUpperBound = $('#lobetract_connection_end_endneuron').val();
            edited_gene.SpecialiazedObj.DestinationNBConnections = $('#lobetract_connection_end_nbconnections').val();
            var chk = $("input:radio[name ='lobetract-migration']:checked").val();
            if (chk == 1) {
                edited_gene.SpecialiazedObj.UseRandom = false;
            } else {
                edited_gene.SpecialiazedObj.UseRandom = true;
            }
            chk = $("input:radio[name ='lobetract-connections']:checked").val();
            if (chk == 1) {
                edited_gene.SpecialiazedObj.NoConnectionsIsRandom = false;
            } else {
                edited_gene.SpecialiazedObj.NoConnectionsIsRandom = true;
            }
            saveSVRuleFromUI("lobetract_input", edited_gene.SpecialiazedObj.InitSVRule);
            saveSVRuleFromUI("lobetract_update", edited_gene.SpecialiazedObj.UpdateSVRule);
        } else if (edited_gene.GeneType == 1 && edited_gene.GeneSubType == 0) {
            //Biochemistry Receptor
            edited_gene.SpecialiazedObj.Organ = $('#biochemistryReceptorOrgan').val();
            edited_gene.SpecialiazedObj.Tissue = $('#biochemistryReceptorTissue').val();
            edited_gene.SpecialiazedObj.Locus = $('#biochemistryReceptorLocus').val();
            edited_gene.SpecialiazedObj.Chemical = $('#biochemistryReceptorChemical').val();
            edited_gene.SpecialiazedObj.Threshold = $('#biochemistryReceptorThreshold').val();
            edited_gene.SpecialiazedObj.Nominal = $('#biochemistryReceptorNominal').val();
            edited_gene.SpecialiazedObj.Gain= $('#biochemistryReceptorGain').val();
            if ($('#biochemistryReceptorFlags1').prop('checked')) {
                edited_gene.SpecialiazedObj.Inverted = true;
            } else {
                edited_gene.SpecialiazedObj.Inverted = false;
            }
            if ($('#biochemistryReceptorFlags2').prop('checked')) {
                edited_gene.SpecialiazedObj.Digital = true;
            } else {
                edited_gene.SpecialiazedObj.Digital = false;
            }
        }
    }

    refreshDataTable();
    $('#geneModal').modal('hide');
}