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
    //Chemical reaction
    fillSelectWithChemicals($('#biochemistryReactionReactant0'));
    fillSelectWithChemicals($('#biochemistryReactionReactant1'));
    fillSelectWithChemicals($('#biochemistryReactionProduct2'));
    fillSelectWithChemicals($('#biochemistryReactionProduct3'));
    //Biochemistry Half lives
    for (var i=0; i<256; i++) {
        var halflife_row = $('#geneBiochemistryHalfLivesRow').clone();
        var chemical_name = "Unknown Chemical "+i;
        if (i<Chemicals_str.length) {
            if (Chemicals_str[i] != "") {
                chemical_name = Chemicals_str[i];
            }
        }
        halflife_row.find('div[name=biochemistryHalfLivesName]').html(chemical_name);
        halflife_row.find('input[name=biochemistryHalfLivesVal]').attr("id","biochemistryHalfLivesVal_" + i);
        halflife_row.find('span[name=biochemistryHalfLivesVal_label]').attr("id","biochemistryHalfLivesVal_label_" + i);
        halflife_row.find('input[name=biochemistryHalfLivesVal]').attr("gk-label","biochemistryHalfLivesVal_label_" + i);
        $('#biochemistryHalfLivesList').append(halflife_row);
    }
    //Biochemistry Initial Concentration
    fillSelectWithChemicals($('#geneBiochemistryInitialConcentrationChemical'));
    //Biochemistry Neuro Emitters
    fillSelectWithChemicals($('#geneBiochemistryNeuroEmitterChemical1'));
    fillSelectWithChemicals($('#geneBiochemistryNeuroEmitterChemical2'));
    fillSelectWithChemicals($('#geneBiochemistryNeuroEmitterChemical3'));
    fillSelectWithChemicals($('#geneBiochemistryNeuroEmitterChemical4'));
    //Creature Stimulus
    fillSelectWithChemicalsDrive($('#geneCreatureStimulusChemical0'));
    fillSelectWithChemicalsDrive($('#geneCreatureStimulusChemical1'));
    fillSelectWithChemicalsDrive($('#geneCreatureStimulusChemical2'));
    fillSelectWithChemicalsDrive($('#geneCreatureStimulusChemical3'));
    //Creature Appearance
    fillSelectWithBodyVariants($('#geneCreatureAppearanceVariant'));
    //Creature Pose
    fillSelectWithPoses($('#geneCreaturePoseID'), false);
    //Creature Gait
    fillSelectWithPoses($('#geneCreatureGaitPose1'), true);
    fillSelectWithPoses($('#geneCreatureGaitPose2'), true);
    fillSelectWithPoses($('#geneCreatureGaitPose3'), true);
    fillSelectWithPoses($('#geneCreatureGaitPose4'), true);
    fillSelectWithPoses($('#geneCreatureGaitPose5'), true);
    fillSelectWithPoses($('#geneCreatureGaitPose6'), true);
    fillSelectWithPoses($('#geneCreatureGaitPose7'), true);
    fillSelectWithPoses($('#geneCreatureGaitPose8'), true);
    //Creature Instincts
    fillSelectWithChemicalsDrive($('#geneCreatureInstictReinforcementDrive'));
    //Creature Facial Expression
    fillSelectWithChemicalsDrive($('#geneCreatureFacialExpressionDrive0'));
    fillSelectWithChemicalsDrive($('#geneCreatureFacialExpressionDrive1'));
    fillSelectWithChemicalsDrive($('#geneCreatureFacialExpressionDrive2'));
    fillSelectWithChemicalsDrive($('#geneCreatureFacialExpressionDrive3'));
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
    //Complete the list
    for (var i=Chemicals_str.length; i<255; i++) {
        str = "Unused Chemical "+i;
        var o = new Option(str, i);
        $(o).html(str);// jquerify the DOM object 'o' so we can use the html method
        select_obj.append(o);
    }
}

function fillSelectWithChemicalsDrive(select_obj) {
    //Chemicals drive for Stimulus is organizedd in a weird way, there is a 148 offset in the table and "Unused" = 255
    select_obj.empty();
    var o = new Option("-Unused-", 255);
    $(o).html("-Unused-");// jquerify the DOM object 'o' so we can use the html method
    select_obj.append(o);
    for (var i=148; i < Chemicals_str.length; i++) {
        var str = Chemicals_str[i];
        if (str == "") {
            str = "Unused Chemical "+i;
        }
        var o = new Option(str, i-148);
        $(o).html(str);// jquerify the DOM object 'o' so we can use the html method
        select_obj.append(o);
    }
}

function fillSelectWithPoses(select_obj, erase_first) {
    select_obj.empty();
    for (var i=0; i< Pose_str.length; i++) {
        var str = Pose_str[i];
        if (str == "") {
            str = "Unused Pose "+i;
        }
        if (erase_first && i==0) {
            str = "-Empty-"; //Don't know why, but in Gaits, pose[0] "Reach low near" is replaced by the placeholder value
        }
        var o = new Option(str, i);
        $(o).html(str);// jquerify the DOM object 'o' so we can use the html method
        select_obj.append(o);
    }
    //Complete the list
    for (var i=Pose_str.length; i<255; i++) {
        str = "Unused Pose "+i;
        var o = new Option(str, i);
        $(o).html(str);// jquerify the DOM object 'o' so we can use the html method
        select_obj.append(o);
    }
}

function fillSelectWithBodyVariants(select_obj) {
    select_obj.empty();
    for (var i=0; i < 26; i++) {
        var str = String.fromCharCode( 65 + i);
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

//Move all specialized Gene UI panels back into the hidden DIV
function clearSpecializedPanels() {
    $('#hiddenPanel').append($('div[name ="specializedPane"]'));
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
    clearSpecializedPanels();
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
    } else if (gene_obj.GeneType == 1 && (gene_obj.GeneSubType == 0 || gene_obj.GeneSubType == 1)) {
        //Biochemistry Receptor and Emitter
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
        if (gene_obj.GeneSubType == 0) {
            //Receptor
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
            $('#biochemistryReceptorCheckboxes').show();
            $('#biochemistryEmitterCheckboxes').hide();
        } else {
            //Emitter
            if (gene_obj.SpecialiazedObj.Inverted) {
                $('#biochemistryEmitterFlags1').prop('checked', true);
            } else {
                $('#biochemistryEmitterFlags1').prop('checked', false);
            }
            if (gene_obj.SpecialiazedObj.Digital) {
                $('#biochemistryEmitterFlags2').prop('checked', true);
            } else {
                $('#biochemistryEmitterFlags2').prop('checked', false);
            }
            if (gene_obj.SpecialiazedObj.ClearSource) {
                $('#biochemistryEmitterFlags3').prop('checked', true);
            } else {
                $('#biochemistryEmitterFlags3').prop('checked', false);
            }
            $('#biochemistryReceptorCheckboxes').hide();
            $('#biochemistryEmitterCheckboxes').show();
        }
    } else if (gene_obj.GeneType == 1 && gene_obj.GeneSubType == 2) {
        //Biochemistry Reaction
        $('#geneModalSpecialized').append($('#geneBiochemistryReaction'));
        $('#biochemistryReactionReactant0').val(gene_obj.SpecialiazedObj.Reactant0);
        $('#biochemistryReactionReactant0Qty').val(gene_obj.SpecialiazedObj.Quantity0);
        $('#biochemistryReactionReactant1').val(gene_obj.SpecialiazedObj.Reactant1);
        $('#biochemistryReactionReactant1Qty').val(gene_obj.SpecialiazedObj.Quantity1);
        $('#biochemistryReactionProduct2').val(gene_obj.SpecialiazedObj.Product2);
        $('#biochemistryReactionProduct2Qty').val(gene_obj.SpecialiazedObj.Quantity2);
        $('#biochemistryReactionProduct3').val(gene_obj.SpecialiazedObj.Product3);
        $('#biochemistryReactionProduct3Qty').val(gene_obj.SpecialiazedObj.Quantity3);
        $('#biochemistryReactionRate').val(gene_obj.SpecialiazedObj.ReactionRate);
        $('#biochemistryReactionRate').change();
    } else if (gene_obj.GeneType == 1 && gene_obj.GeneSubType == 3) {
        //Biochemistry Half Lives
        $('#geneModalSpecialized').append($('#geneBiochemistryHalfLives'));
        for (var i=0; i<256; i++) {
            if (i<gene_obj.SpecialiazedObj.HalfLife.length) {
                $('#biochemistryHalfLivesVal_' + i).val(gene_obj.SpecialiazedObj.HalfLife[i]);
                $('#biochemistryHalfLivesVal_' + i).change();
            }
        }
    } else if (gene_obj.GeneType == 1 && gene_obj.GeneSubType == 4) {
        //Biochemistry Initial Concentration
        $('#geneModalSpecialized').append($('#geneBiochemistryInitialConcentration'));
        $('#geneBiochemistryInitialConcentrationChemical').val(gene_obj.SpecialiazedObj.Chemical);
        $('#geneBiochemistryInitialConcentrationAmount').val(gene_obj.SpecialiazedObj.Amount);
        $('#geneBiochemistryInitialConcentrationAmount').change();
    } else if (gene_obj.GeneType == 1 && gene_obj.GeneSubType == 5) {
        //Biochemistry Neuro Emitter
        $('#geneModalSpecialized').append($('#geneBiochemistryNeuroEmitter'));
        $('#geneBiochemistryNeuroEmitterLobe1').val(gene_obj.SpecialiazedObj.Lobe1);
        $('#geneBiochemistryNeuroEmitterNeuron1').val(gene_obj.SpecialiazedObj.Neuron1);
        $('#geneBiochemistryNeuroEmitterLobe2').val(gene_obj.SpecialiazedObj.Lobe2);
        $('#geneBiochemistryNeuroEmitterNeuron2').val(gene_obj.SpecialiazedObj.Neuron2);
        $('#geneBiochemistryNeuroEmitterLobe3').val(gene_obj.SpecialiazedObj.Lobe3);
        $('#geneBiochemistryNeuroEmitterNeuron3').val(gene_obj.SpecialiazedObj.Neuron3);
        $('#geneBiochemistryNeuroEmitterChemical1').val(gene_obj.SpecialiazedObj.Chemical1);
        $('#geneBiochemistryNeuroEmitterChemicalAmount1').val(gene_obj.SpecialiazedObj.Amount1);
        $('#geneBiochemistryNeuroEmitterChemicalAmount1').change();
        $('#geneBiochemistryNeuroEmitterChemical2').val(gene_obj.SpecialiazedObj.Chemical2);
        $('#geneBiochemistryNeuroEmitterChemicalAmount2').val(gene_obj.SpecialiazedObj.Amount2);
        $('#geneBiochemistryNeuroEmitterChemicalAmount2').change();
        $('#geneBiochemistryNeuroEmitterChemical3').val(gene_obj.SpecialiazedObj.Chemical3);
        $('#geneBiochemistryNeuroEmitterChemicalAmount3').val(gene_obj.SpecialiazedObj.Amount3);
        $('#geneBiochemistryNeuroEmitterChemicalAmount3').change();
        $('#geneBiochemistryNeuroEmitterChemical4').val(gene_obj.SpecialiazedObj.Chemical4);
        $('#geneBiochemistryNeuroEmitterChemicalAmount4').val(gene_obj.SpecialiazedObj.Amount4);
        $('#geneBiochemistryNeuroEmitterChemicalAmount4').change();
        $('#geneBiochemistryNeuroEmitterSampleRate').val(gene_obj.SpecialiazedObj.SampleRate);
        $('#geneBiochemistryNeuroEmitterSampleRate').change();
    } else if (gene_obj.GeneType == 2 && gene_obj.GeneSubType == 0) {
        //Creature Stimulus
        $('#geneModalSpecialized').append($('#geneCreatureStimulus'));
        $('#geneCreatureStimulusID').val(gene_obj.SpecialiazedObj.StimulusNumber);
        $('#geneCreatureStimulusSignificance').val(gene_obj.SpecialiazedObj.Significance);
        $('#geneCreatureStimulusSignificance').change();
        $('#geneCreatureStimulusReaction').val(gene_obj.SpecialiazedObj.SensoryNeuron);
        $('#geneCreatureStimulusIntensity').val(gene_obj.SpecialiazedObj.Features);
        if (gene_obj.SpecialiazedObj.Modulate) {
            $('#geneCreatureStimulusModulate').prop('checked', true);
        } else {
            $('#geneCreatureStimulusModulate').prop('checked', false);
        }
        if (gene_obj.SpecialiazedObj.Detected) {
            $('#geneCreatureStimulusDetected').prop('checked', true);
        } else {
            $('#geneCreatureStimulusDetected').prop('checked', false);
        }
        if (gene_obj.SpecialiazedObj.Silent0) {
            $('#geneCreatureStimulusSilent0').prop('checked', true);
        } else {
            $('#geneCreatureStimulusSilent0').prop('checked', false);
        }
        $('#geneCreatureStimulusChemical0').val(gene_obj.SpecialiazedObj.Drive0);
        $('#geneCreatureStimulusAmount0').val(gene_obj.SpecialiazedObj.Amount0);
        $('#geneCreatureStimulusAmount0').change();
        if (gene_obj.SpecialiazedObj.Silent1) {
            $('#geneCreatureStimulusSilent1').prop('checked', true);
        } else {
            $('#geneCreatureStimulusSilent1').prop('checked', false);
        }
        $('#geneCreatureStimulusChemical1').val(gene_obj.SpecialiazedObj.Drive1);
        $('#geneCreatureStimulusAmount1').val(gene_obj.SpecialiazedObj.Amount1);
        $('#geneCreatureStimulusAmount1').change();
        if (gene_obj.SpecialiazedObj.Silent2) {
            $('#geneCreatureStimulusSilent2').prop('checked', true);
        } else {
            $('#geneCreatureStimulusSilent2').prop('checked', false);
        }
        $('#geneCreatureStimulusChemical2').val(gene_obj.SpecialiazedObj.Drive2);
        $('#geneCreatureStimulusAmount2').val(gene_obj.SpecialiazedObj.Amount2);
        $('#geneCreatureStimulusAmount2').change();
        if (gene_obj.SpecialiazedObj.Silent3) {
            $('#geneCreatureStimulusSilent3').prop('checked', true);
        } else {
            $('#geneCreatureStimulusSilent3').prop('checked', false);
        }
        $('#geneCreatureStimulusChemical3').val(gene_obj.SpecialiazedObj.Drive3);
        $('#geneCreatureStimulusAmount3').val(gene_obj.SpecialiazedObj.Amount3);
        $('#geneCreatureStimulusAmount3').change();
    } else if (gene_obj.GeneType == 2 && gene_obj.GeneSubType == 1) {
        //Creature Genus
        $('#geneModalSpecialized').append($('#geneCreatureGenus'));
        $('#geneCreatureGenusGenus').val(gene_obj.SpecialiazedObj.Genus);
        $('#geneCreatureGenusMotherMoniker').val(gene_obj.SpecialiazedObj.MumMoniker);
        $('#geneCreatureGenusFatherMoniker').val(gene_obj.SpecialiazedObj.DadMoniker);
    } else if (gene_obj.GeneType == 2 && gene_obj.GeneSubType == 2) {
        //Creature Appearance
        $('#geneModalSpecialized').append($('#geneCreatureAppearance'));
        $('#geneCreatureAppearanceBodyPart').val(gene_obj.SpecialiazedObj.BodyPart);
        $('#geneCreatureAppearanceVariant').val(gene_obj.SpecialiazedObj.Variant);
        $('#geneCreatureAppearanceGenusOfDonor').val(gene_obj.SpecialiazedObj.GenusOfDonor);
    } else if (gene_obj.GeneType == 2 && gene_obj.GeneSubType == 3) {
        //Creature Pose
        $('#geneModalSpecialized').append($('#geneCreaturePose'));
        $('#geneCreaturePoseID').val(gene_obj.SpecialiazedObj.PoseNumber);
        $('#geneCreaturePoseString').val(gene_obj.SpecialiazedObj.PoseString);
    } else if (gene_obj.GeneType == 2 && gene_obj.GeneSubType == 4) {
        //Creature Gait
        $('#geneModalSpecialized').append($('#geneCreatureGait'));
        $('#geneCreatureGaitID').val(gene_obj.SpecialiazedObj.GaitNumber);
        $('#geneCreatureGaitPose1').val(gene_obj.SpecialiazedObj.PoseSequence[0]);
        $('#geneCreatureGaitPose2').val(gene_obj.SpecialiazedObj.PoseSequence[1]);
        $('#geneCreatureGaitPose3').val(gene_obj.SpecialiazedObj.PoseSequence[2]);
        $('#geneCreatureGaitPose4').val(gene_obj.SpecialiazedObj.PoseSequence[3]);
        $('#geneCreatureGaitPose5').val(gene_obj.SpecialiazedObj.PoseSequence[4]);
        $('#geneCreatureGaitPose6').val(gene_obj.SpecialiazedObj.PoseSequence[5]);
        $('#geneCreatureGaitPose7').val(gene_obj.SpecialiazedObj.PoseSequence[6]);
        $('#geneCreatureGaitPose8').val(gene_obj.SpecialiazedObj.PoseSequence[7]);
    } else if (gene_obj.GeneType == 2 && gene_obj.GeneSubType == 5) {
        //Creature Gait
        $('#geneModalSpecialized').append($('#geneCreatureInstict'));
        $('#geneCreatureInstictLobe0').val(gene_obj.SpecialiazedObj.Lobe0);
        $('#geneCreatureInstictNeuron0').val(gene_obj.SpecialiazedObj.Neuron0);
        $('#geneCreatureInstictLobe1').val(gene_obj.SpecialiazedObj.Lobe1);
        $('#geneCreatureInstictNeuron1').val(gene_obj.SpecialiazedObj.Neuron1);
        $('#geneCreatureInstictLobe2').val(gene_obj.SpecialiazedObj.Lobe2);
        $('#geneCreatureInstictNeuron2').val(gene_obj.SpecialiazedObj.Neuron2);
        $('#geneCreatureInstictAction').val(gene_obj.SpecialiazedObj.Action);
        $('#geneCreatureInstictReinforcementDrive').val(gene_obj.SpecialiazedObj.ReinforcementDrive);
        $('#geneCreatureInstictReinforcementLevel').val(gene_obj.SpecialiazedObj.ReinforcementLevel);
        $('#geneCreatureInstictReinforcementLevel').change();
    } else if (gene_obj.GeneType == 2 && gene_obj.GeneSubType == 6) {
        //Creature Pigment
        $('#geneModalSpecialized').append($('#geneCreaturePigment'));
        $('#geneCreaturePigmentColour').val(gene_obj.SpecialiazedObj.PigmentColour);
        $('#geneCreaturePigmentColourAmountOfColour').val(gene_obj.SpecialiazedObj.AmountOfColour);
        $('#geneCreaturePigmentColourAmountOfColour').change();
    } else if (gene_obj.GeneType == 2 && gene_obj.GeneSubType == 7) {
        //Creature Pigment Bleed
        $('#geneModalSpecialized').append($('#geneCreaturePigmentBleed'));
        $('#geneCreaturePigmentBleedRotation').val(gene_obj.SpecialiazedObj.Rotation);
        $('#geneCreaturePigmentBleedRotation').change();
        $('#geneCreaturePigmentBleedSwap').val(gene_obj.SpecialiazedObj.Swap);
        $('#geneCreaturePigmentBleedSwap').change();
    } else if (gene_obj.GeneType == 2 && gene_obj.GeneSubType == 8) {
        //Creature Facial Expression
        $('#geneModalSpecialized').append($('#geneCreatureFacialExpression'));
        $('#geneCreatureFacialExpressionExpressionID').val(gene_obj.SpecialiazedObj.Expression);
        $('#geneCreatureFacialExpressionWeight').val(gene_obj.SpecialiazedObj.Weight);
        $('#geneCreatureFacialExpressionWeight').change();
        $('#geneCreatureFacialExpressionDrive0').val(gene_obj.SpecialiazedObj.Drive0);
        $('#geneCreatureFacialExpressionAmount0').val(gene_obj.SpecialiazedObj.Amount0);
        $('#geneCreatureFacialExpressionAmount0').change();
        $('#geneCreatureFacialExpressionDrive1').val(gene_obj.SpecialiazedObj.Drive1);
        $('#geneCreatureFacialExpressionAmount1').val(gene_obj.SpecialiazedObj.Amount1);
        $('#geneCreatureFacialExpressionAmount1').change();
        $('#geneCreatureFacialExpressionDrive2').val(gene_obj.SpecialiazedObj.Drive2);
        $('#geneCreatureFacialExpressionAmount2').val(gene_obj.SpecialiazedObj.Amount2);
        $('#geneCreatureFacialExpressionAmount2').change();
        $('#geneCreatureFacialExpressionDrive3').val(gene_obj.SpecialiazedObj.Drive3);
        $('#geneCreatureFacialExpressionAmount3').val(gene_obj.SpecialiazedObj.Amount3);
        $('#geneCreatureFacialExpressionAmount3').change();
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
        } else if (edited_gene.GeneType == 1 && (edited_gene.GeneSubType == 0 || edited_gene.GeneSubType == 1)) {
            //Biochemistry Receptor and Emitter
            edited_gene.SpecialiazedObj.Organ = $('#biochemistryReceptorOrgan').val();
            edited_gene.SpecialiazedObj.Tissue = $('#biochemistryReceptorTissue').val();
            edited_gene.SpecialiazedObj.Locus = $('#biochemistryReceptorLocus').val();
            edited_gene.SpecialiazedObj.Chemical = $('#biochemistryReceptorChemical').val();
            edited_gene.SpecialiazedObj.Threshold = $('#biochemistryReceptorThreshold').val();
            edited_gene.SpecialiazedObj.Nominal = $('#biochemistryReceptorNominal').val();
            edited_gene.SpecialiazedObj.Gain= $('#biochemistryReceptorGain').val();
            if (edited_gene.GeneSubType == 0) {
                //Receptor
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
            } else {
                //Emitter
                if ($('#biochemistryEmitterFlags1').prop('checked')) {
                    edited_gene.SpecialiazedObj.Inverted = true;
                } else {
                    edited_gene.SpecialiazedObj.Inverted = false;
                }
                if ($('#biochemistryEmitterFlags2').prop('checked')) {
                    edited_gene.SpecialiazedObj.Digital = true;
                } else {
                    edited_gene.SpecialiazedObj.Digital = false;
                }
                if ($('#biochemistryEmitterFlags3').prop('checked')) {
                    edited_gene.SpecialiazedObj.ClearSource = true;
                } else {
                    edited_gene.SpecialiazedObj.ClearSource = false;
                }
            }
        } else if (edited_gene.GeneType == 1 && edited_gene.GeneSubType == 2) {
            //Biochemistry Reaction
            edited_gene.SpecialiazedObj.Reactant0 = $('#biochemistryReactionReactant0').val();
            edited_gene.SpecialiazedObj.Quantity0 = $('#biochemistryReactionReactant0Qty').val();
            edited_gene.SpecialiazedObj.Reactant1 = $('#biochemistryReactionReactant1').val();
            edited_gene.SpecialiazedObj.Quantity1 = $('#biochemistryReactionReactant1Qty').val();
            edited_gene.SpecialiazedObj.Product2 = $('#biochemistryReactionProduct2').val();
            edited_gene.SpecialiazedObj.Quantity2 = $('#biochemistryReactionProduct2Qty').val();
            edited_gene.SpecialiazedObj.Product3 = $('#biochemistryReactionProduct3').val();
            edited_gene.SpecialiazedObj.Quantity3 = $('#biochemistryReactionProduct3Qty').val();
            edited_gene.SpecialiazedObj.ReactionRate = $('#biochemistryReactionRate').val();
        } else if (edited_gene.GeneType == 1 && edited_gene.GeneSubType == 3) {
            //Biochemistry Half Lives
            if (edited_gene.SpecialiazedObj.HalfLife.length<255) {
                edited_gene.SpecialiazedObj.HalfLife = [255];
            }
            for (var i=0; i<256; i++) {
                edited_gene.SpecialiazedObj.HalfLife[i] = $('#biochemistryHalfLivesVal_' + i).val();
            }
        } else if (edited_gene.GeneType == 1 && edited_gene.GeneSubType == 4) {
            //Biochemistry Initial Concentration
            edited_gene.SpecialiazedObj.Chemical = $('#geneBiochemistryInitialConcentrationChemical').val();
            edited_gene.SpecialiazedObj.Amount = $('#geneBiochemistryInitialConcentrationAmount').val();
        } else if (edited_gene.GeneType == 1 && edited_gene.GeneSubType == 5) {
            //Biochemistry Neuro Emitter
            edited_gene.SpecialiazedObj.Lobe1 = $('#geneBiochemistryNeuroEmitterLobe1').val();
            edited_gene.SpecialiazedObj.Neuron1 = $('#geneBiochemistryNeuroEmitterNeuron1').val();
            edited_gene.SpecialiazedObj.Lobe2 = $('#geneBiochemistryNeuroEmitterLobe2').val();
            edited_gene.SpecialiazedObj.Neuron2 = $('#geneBiochemistryNeuroEmitterNeuron2').val();
            edited_gene.SpecialiazedObj.Lobe3 = $('#geneBiochemistryNeuroEmitterLobe3').val();
            edited_gene.SpecialiazedObj.Neuron3 = $('#geneBiochemistryNeuroEmitterNeuron3').val();
            edited_gene.SpecialiazedObj.Chemical1 = $('#geneBiochemistryNeuroEmitterChemical1').val();
            edited_gene.SpecialiazedObj.Amount1 = $('#geneBiochemistryNeuroEmitterChemicalAmount1').val();
            edited_gene.SpecialiazedObj.Chemical2 = $('#geneBiochemistryNeuroEmitterChemical2').val();
            edited_gene.SpecialiazedObj.Amount2 = $('#geneBiochemistryNeuroEmitterChemicalAmount2').val();
            edited_gene.SpecialiazedObj.Chemical3 = $('#geneBiochemistryNeuroEmitterChemical3').val();
            edited_gene.SpecialiazedObj.Amount3 = $('#geneBiochemistryNeuroEmitterChemicalAmount3').val();
            edited_gene.SpecialiazedObj.Chemical4 = $('#geneBiochemistryNeuroEmitterChemical4').val();
            edited_gene.SpecialiazedObj.Amount4 = $('#geneBiochemistryNeuroEmitterChemicalAmount4').val();
            edited_gene.SpecialiazedObj.SampleRate = $('#geneBiochemistryNeuroEmitterSampleRate').val();
        } else if (edited_gene.GeneType == 2 && edited_gene.GeneSubType == 0) {
            //Creature Stimulus
            edited_gene.SpecialiazedObj.StimulusNumber = $('#geneCreatureStimulusID').val();
            edited_gene.SpecialiazedObj.Significance = $('#geneCreatureStimulusSignificance').val();
            edited_gene.SpecialiazedObj.SensoryNeuron = $('#geneCreatureStimulusReaction').val();
            edited_gene.SpecialiazedObj.Features = $('#geneCreatureStimulusIntensity').val();
            if ($('#geneCreatureStimulusModulate').prop('checked')) {
                edited_gene.SpecialiazedObj.Modulate = true;
            } else {
                edited_gene.SpecialiazedObj.Modulate = false;
            }
            if ($('#geneCreatureStimulusDetected').prop('checked')) {
                edited_gene.SpecialiazedObj.Detected = true;
            } else {
                edited_gene.SpecialiazedObj.Detected = false;
            }
            if ($('#geneCreatureStimulusSilent0').prop('checked')) {
                edited_gene.SpecialiazedObj.Silent0 = true;
            } else {
                edited_gene.SpecialiazedObj.Silent0 = false;
            }
            edited_gene.SpecialiazedObj.Drive0 = $('#geneCreatureStimulusChemical0').val();
            edited_gene.SpecialiazedObj.Amount0 = $('#geneCreatureStimulusAmount0').val();
            if ($('#geneCreatureStimulusSilent1').prop('checked')) {
                edited_gene.SpecialiazedObj.Silent1 = true;
            } else {
                edited_gene.SpecialiazedObj.Silent1 = false;
            }
            edited_gene.SpecialiazedObj.Drive1 = $('#geneCreatureStimulusChemical1').val();
            edited_gene.SpecialiazedObj.Amount1 = $('#geneCreatureStimulusAmount1').val();
            if ($('#geneCreatureStimulusSilent2').prop('checked')) {
                edited_gene.SpecialiazedObj.Silent2 = true;
            } else {
                edited_gene.SpecialiazedObj.Silent2 = false;
            }
            edited_gene.SpecialiazedObj.Drive2 = $('#geneCreatureStimulusChemical2').val();
            edited_gene.SpecialiazedObj.Amount2 = $('#geneCreatureStimulusAmount2').val();
            if ($('#geneCreatureStimulusSilent3').prop('checked')) {
                edited_gene.SpecialiazedObj.Silent3 = true;
            } else {
                edited_gene.SpecialiazedObj.Silent3 = false;
            }
            edited_gene.SpecialiazedObj.Drive3 = $('#geneCreatureStimulusChemical3').val();
            edited_gene.SpecialiazedObj.Amount3 = $('#geneCreatureStimulusAmount3').val();
        } else if (edited_gene.GeneType == 2 && edited_gene.GeneSubType == 1) {
            //Creature Genus
            edited_gene.SpecialiazedObj.Genus = $('#geneCreatureGenusGenus').val();
            edited_gene.SpecialiazedObj.MumMoniker = $('#geneCreatureGenusMotherMoniker').val();
            edited_gene.SpecialiazedObj.DadMoniker = $('#geneCreatureGenusFatherMoniker').val();
        } else if (edited_gene.GeneType == 2 && edited_gene.GeneSubType == 2) {
            //Creature Appearance
            edited_gene.SpecialiazedObj.BodyPart = $('#geneCreatureAppearanceBodyPart').val();
            edited_gene.SpecialiazedObj.Variant = $('#geneCreatureAppearanceVariant').val();
            edited_gene.SpecialiazedObj.GenusOfDonor = $('#geneCreatureAppearanceGenusOfDonor').val();
        } else if (edited_gene.GeneType == 2 && edited_gene.GeneSubType == 3) {
            //Creature Pose
            edited_gene.SpecialiazedObj.PoseNumber = $('#geneCreaturePoseID').val();
            edited_gene.SpecialiazedObj.PoseString = $('#geneCreaturePoseString').val();
        } else if (edited_gene.GeneType == 2 && edited_gene.GeneSubType == 4) {
            //Creature Gait
            edited_gene.SpecialiazedObj.GaitNumber = $('#geneCreatureGaitID').val();
            edited_gene.SpecialiazedObj.PoseSequence[0] = $('#geneCreatureGaitPose1').val();
            edited_gene.SpecialiazedObj.PoseSequence[1] = $('#geneCreatureGaitPose2').val();
            edited_gene.SpecialiazedObj.PoseSequence[2] = $('#geneCreatureGaitPose3').val();
            edited_gene.SpecialiazedObj.PoseSequence[3] = $('#geneCreatureGaitPose4').val();
            edited_gene.SpecialiazedObj.PoseSequence[4] = $('#geneCreatureGaitPose5').val();
            edited_gene.SpecialiazedObj.PoseSequence[5] = $('#geneCreatureGaitPose6').val();
            edited_gene.SpecialiazedObj.PoseSequence[6] = $('#geneCreatureGaitPose7').val();
            edited_gene.SpecialiazedObj.PoseSequence[7] = $('#geneCreatureGaitPose8').val();
        } else if (edited_gene.GeneType == 2 && edited_gene.GeneSubType == 5) {
            //Creature Gait
            edited_gene.SpecialiazedObj.Lobe0 = $('#geneCreatureInstictLobe0').val();
            edited_gene.SpecialiazedObj.Neuron0 = $('#geneCreatureInstictNeuron0').val();
            edited_gene.SpecialiazedObj.Lobe1 = $('#geneCreatureInstictLobe1').val();
            edited_gene.SpecialiazedObj.Neuron1 = $('#geneCreatureInstictNeuron1').val();
            edited_gene.SpecialiazedObj.Lobe2 = $('#geneCreatureInstictLobe2').val();
            edited_gene.SpecialiazedObj.Neuron2 = $('#geneCreatureInstictNeuron2').val();
            edited_gene.SpecialiazedObj.Action = $('#geneCreatureInstictAction').val();
            edited_gene.SpecialiazedObj.ReinforcementDrive = $('#geneCreatureInstictReinforcementDrive').val();
            edited_gene.SpecialiazedObj.ReinforcementLevel = $('#geneCreatureInstictReinforcementLevel').val();
        } else if (edited_gene.GeneType == 2 && edited_gene.GeneSubType == 6) {
            //Creature Pigment
            edited_gene.SpecialiazedObj.PigmentColour = $('#geneCreaturePigmentColour').val();
            edited_gene.SpecialiazedObj.AmountOfColour = $('#geneCreaturePigmentColourAmountOfColour').val();
        } else if (edited_gene.GeneType == 2 && edited_gene.GeneSubType == 7) {
            //Creature Pigment Bleed
            edited_gene.SpecialiazedObj.Rotation = $('#geneCreaturePigmentBleedRotation').val();
            edited_gene.SpecialiazedObj.Swap = $('#geneCreaturePigmentBleedSwap').val();
        } else if (edited_gene.GeneType == 2 && edited_gene.GeneSubType == 8) {
            //Creature Facial Expression
            edited_gene.SpecialiazedObj.Expression = $('#geneCreatureFacialExpressionExpressionID').val();
            edited_gene.SpecialiazedObj.Weight = $('#geneCreatureFacialExpressionWeight').val();
            edited_gene.SpecialiazedObj.Drive0 = $('#geneCreatureFacialExpressionDrive0').val();
            edited_gene.SpecialiazedObj.Amount0 = $('#geneCreatureFacialExpressionAmount0').val();
            edited_gene.SpecialiazedObj.Drive1 = $('#geneCreatureFacialExpressionDrive1').val();
            edited_gene.SpecialiazedObj.Amount1 = $('#geneCreatureFacialExpressionAmount1').val();
            edited_gene.SpecialiazedObj.Drive2 = $('#geneCreatureFacialExpressionDrive2').val();
            edited_gene.SpecialiazedObj.Amount2 = $('#geneCreatureFacialExpressionAmount2').val();
            edited_gene.SpecialiazedObj.Drive3 = $('#geneCreatureFacialExpressionDrive3').val();
            edited_gene.SpecialiazedObj.Amount3 = $('#geneCreatureFacialExpressionAmount3').val();
        }
    }

    refreshDataTable();
    $('#geneModal').modal('hide');
}