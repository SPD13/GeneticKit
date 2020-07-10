/*
Strings to connect values with Labels in the UI
 */
GeneTypes_str = [
    "Brain",
    "Biochemistry",
    "Creature",
    "Organ"
];
GeneSubTypes_str = [
    ["Brain Lobe", "Brain Organ", "Brain Tract"],
    ["Receptor", "Emitter", "Reaction", "Half-Life", "Initial Concentration", "Neuro Emitter"],
    ["Stimulus", "Genus", "Appearance", "Pose", "Gait", "Instinct", "Pigment", "Pigment Bleed", "Facial Expression"],
    ["Organ"]
];
SwitchOn_str = [
    "Embryo",
    "Child",
    "Adolescent",
    "Youth",
    "Adult",
    "Old",
    "Senile"
];
LobeId_str = {
    verb: "Verb",
    noun: "Noun",
    smel: "Smell",
    visn: "Vision",
    driv: "Drive",
    detl: "Detail",
    situ: "Situation",
    forf: "Friends and Foes",
    attn: "Attention",
    decn: "Decision",
    move: "Move",
    comb: "Combinations",
    stim: "Stimuli",
    resp: "Response",
    mood: "Mood"
};
NeuronVariable_str = [
    "State",
    "Input",
    "Output",
    "Susceptibility",
    "Susceptibility Input",
    "Var 5",
    "Var 6",
    "Neural Growth Factor"
];
DendriteVariable_str = [
    "Weight",
    "Var 1",
    "Var 2",
    "Var 3",
    "Last Signal",
    "Var 5",
    "Var 6",
    "Strength"
];

Chemicals_str = [
    "-NOTHING-","Lactate","Pyruvate","Glucose","Glycogen","Starch","Fatty acid","Cholesterol","Triglyceride","Adipose tissue","Fat","Muscle tissue","Protein","Amino acid","","","","Downatrophin","Upatrophin","","","","","","Dissolved carbon dioxide","Urea","Ammonia","","","Air","Oxygen","","","Water","Energy","ATP","ADP","","","Arousal potential","Libido lowerer","Opposite sex pheromone","","","","","Oestrogen","","Progesterone","","","","","Testosterone","Inhibin","","","","","","","","","","","","Heavy metals","Cyanide","Belladonna","Geddonase","Glycotoxin","Sleep toxin","Fever toxin","Histamine A","Histamine B","Alcohol","","","ATP decoupler","Carbon monoxide","Fear toxin","Muscle toxin","Antigen 0","Antigen 1","Antigen 2","Antigen 3","Antigen 4","Antigen 5","Antigen 6","Antigen 7","Wounded","","Medicine one","Anti-oxidant","Prostaglandin","EDTA","Sodium thiosulphate","Arnica","Vitamin E","Vitamin C","Antihistamine","","","","","","","","","","","","Anabolic steroid","Pistle","Insulin","Glycolase","Dehydrogenase","Adrenaline","Grendel nitrate","Ettin nitrate","","Protease","","","Activase","Life","","Injury","Stress","Sleepase","","Pain backup","Hunger for protein backup","Hunger for carb backup","Hunger for fat backup","Coldness backup","Hotness backup","Tiredness backup","Sleepiness backup","Loneliness backup","Crowdedness backup","Fear backup","Boredom backup","Anger backup","Sex drive backup","Comfort drive backup","","","Pain","Hunger for protein","Hunger for carb","Hunger for fat","Coldness","Hotness","Tiredness","Sleepiness","Loneliness","Crowded","Fear","Boredom","Anger","Sex Drive","Comfort drive","","","CA Sound","CA Light","CA Heat","CA Water (from the sky)","CA Nutrient (plants)","CA Water (bodies of)","CA Protein","CA Carbohydrate","CA Fat","CA Flowers","CA Machinery","CA Creature egg","CA Norn smell","CA Grendel smell","CA Ettin smell","CA Norn home smell","CA Grendel home smell","CA Ettin home smell","CA Gadget smell","CA smell 19 [not used]","","","Stress (high H4C) [hunger for carbohydrate]","Stress (high H4P) [hunger for protein]","Stress (high H4F) [hunger for fat]","Stress (high Anger)","Stress (high Fear)","Stress (high Pain)","Stress (high Tired)","Stress (high Sleep)","Stress (high Crowded)","","","Disappointment","Up","Down","Exit","Enter","Wait","Reward","Punishment","Brain chemical 9","Brain chemical 10","Brain chemical 11","Brain chemical 12","Brain chemical 13","Brain chemical 14","Pre - REM","REM"
];

ChemicalsDescription_str = [
    "Produced when a creature is suffocating, hungry for carbohytate or drowning. Causes choking sensation and slight injury to muscles. Though this sounds bad, production of lactate is not a bad thing: it's the body's way of telling the creature that they should do something about their inability to breathe, for instance, to get out of the water!","Produced from glucose. Turns ADP into ATP. Injecting ATP or energy would be more direct.","All food eventually produces glucose. It then becomes pyruvate, and then, one hopes, ATP.","Starch storage chemical. Glycotoxin can deplete this.","Found in high concentration in seeds, and smaller concentration in fruits. Of course, it can also be injected.","This stuff, believe it or not, is actually good. A stage in the breakdown of fat.","A by-product of the breakdown of fat. Sometimes converted to Pyruvate and Amino acid","Another stage in the breakdown of fat.","When your creature needs to store fat for the long-term, the fat becomes this. This is the stuff that makes them fat, but they'll never really be obese.","Fat is actually a good thing. It's found in food and critters.","Long-term storage of protein. Inject to counteract effects of muscle toxin.","Food source found in food and fruit.","When protein is broken down, it becomes this.","","","","This silly-sounding chemical simply makes your creature adopt a \"going-downhill\" gait. It is only produced when it is actually going downhill.","Like downatrophin, but for uphill situations.","","","","","","A waste product (from the breaking down of pyruvate) that is removed from the body by the lungs.","Waste product from protein digestion which controls urination. (No, you don't get to see the creatures urinate.)","Nothing to be alarmed about if you see it in your creature's bloodstream, but don't inject it because it's somewhat toxic. It is a waste product which is naturally turned into urea.","","","Indicates the presence of breathable air, with water produces oxygen.","Used to break down pyruvate, which makes energy. This produces dissolved carbon dioxide as a waste product.","","","By-product of metabolism and also a coolant.","The final product of the breakdown of glucose. It can also save your creature's life in an energy crisis. It turns ADP back into ATP.","ATP is the staple of your creature's bloodstream. Without it, your creature would be dead, and in fact there's an extremely lethal poison that takes advantage of this (ATP Decoupler). ATP is used for almost all bodily functions.","When ATP's energy is used up, it becomes this. There's little point in injecting it (ATP would be the better choice), but its presence in the bloodstream is very normal. When glucose is broken down, ADP becomes ATP.","","","Produced when the creature is fertile, and ready to mate. Needs opposite sex pheromone to convert it into sex drive.","Lowers the sex drive when the creature is not ready to mate for any reason","This Is produced when a creature senses another creature of the correct Species and sex, the presence of this chemical triggers the convert of arousal potential into sex drive.","","","","","Indicates the fertility of a female (no oestrogen, no kisspop). Sharply falling levels of oestrogen indicates the most fertile time for the female.","","Produced during pregnancy. Triggers egg-laying once it reaches a threshold. A shot of progesterone may help a pregnant norn deliver her child. Progesterone also prevents pregnancy for a short time after the norn lays her egg. Fun fact: injecting progesterone into a female will make her body think she is pregnant, her stomach will grow and her body will change in order to concieve,but don't worry, this will wear off and the creature will return to normal.","","","","","Controls fertility in males.","Theoretically controls production of testosterone, but not actually used in C3.","","","","","","","","","","","","Deteriorates the immune system and causes mutations in unborn children.","We all know that in real life, taking cyanide is only useful if you want to ensure your death. With creatures, it's no different. Cyanide will slow down the creation of ATP and will therefore kill your creature if you do nothing about it. It does have a cure: sodium thiosulphate, #96.","Disrupts regulatory functions.","Injected by stinging insects. Destroys adipose tissue.","Attacks creature's glycogen. Cure with arnica.","Causes sleepiness. Otherwise harmless to most creatures. Produced by some antigens.","Causes a fever. Otherwise harmless to most creatures. Produced by some antigens.","Causes sneezing, making disease contagious. Otherwise harmless to most creatures. Produced by some antigens.","Causes coughing, making disease contagious. Otherwise harmless to most creatures. Produced by some antigens.","Causes drunkenness.","","","ATP decoupler does its evil by taking your creature's ATP and quickly turning it all into ADP. It has a cure (medicine one, #92), but ATP decoupler works very fast, so chance of recovery is infinitesimal. An average creature will die within two seconds upon injection of even the smallest dose.","Interferes with oxygen supply.","Causes irrational fear and confusion.","Damages muscle tissue.","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","Builds up muscle tissue.","Regulates urination and water coolation.","Not used?","Not used?","Removes alcohol","Controls \"fight or flight\".","Only found in Grendels. Influences decisions on whether or not a particular creature is friend or foe.","Only found in Ettins. Influences decisions on whether or not a particular creature is friend or foe.","","Converts muscle tissue to amino acid (1->4 in default genome)","","","Not used?","Creature ages as this depletes. A creature dies of old age when it nears zero. Continually injecting this will effectively make your creature immortal.","","Prompts system to heal wounds. However, if it is too high, your Creature's life is endangered.","Produced when a drive is too high for an extended period of time.","Converts \"sleepiness backup\" to \"sleepiness\"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""
];

Pose_str = [
    "Reach low near","Reach lowish near","Reach highish near","Reach high near","Reach low medium","Reach lowish medium","Reach highish medium","Reach high medium","Reach low far","Reach lowish far","Reach highish far","Reach high far","Stand","Normal 1","Normal 2","Normal 3","Normal 4","Pained 1","Pained 2","Pained 3","Pained 4","Tired 1","Tired 2","Tired 3","Tired 4","Scared 1","Scared 2","Scared 3","Scared 4","Anger 1","Anger 2","Anger 3","Anger 4","To camera","Express general need","Express pain","Express hunger","Express tired","Express lonely","Express fear","Toes tap 1","Toes tap 2","Angry 5","Angry 6","Swing arms 1","Swing arms 2","Shiver 1","Shiver 2","Slap Norn 1","Retreat 1","Retreat 2","Retreat 3","Retreat 4","Flee 1","Flee 2","Flee 3","Flee 4","Rest","Sleep","East","West","Bored 1","Bored 2","Bored 3","Bored 4","Throw 1","Throw 2","Kick 1","Kick 2","Drum 1","Drum 2","Sneeze 1","Sneeze 2","Eat 1","Eat 2","Startled","Kiss","Dead","Limp 1","Limp 2","Limp 3","Limp 4","Stagger 1","Stagger 2","Stagger 3","Stagger 4","Downhill 1","Downhill 2","Downhill 3","Downhill 4","Uphill 1","Uphill 2","Uphill 3","Uphill 4","Run 1","Run 2","Run 3","Run 4","Cough 1","Cough 2","Cough 3","Cough 4","Pushed 1","Pushed 2","Pushed 3","Pushed 4","Sneeze 3","Lay egg 1","Lay egg 2","Lay egg 3","Lay egg 4","Slap Norn 2","Slap Norn 3","Slap Norn 4","Slap Norn 5","Falling 1","Falling 2","Impact 1","Impact 2","Impact 3","Impact 4","Impact 5","Yawn 1","Yawn 2","Yawn 3","Dance 1","Dance 2","Dance 3","Dance 4","Dance 5","Dance 6","Pushed behind 1","Pushed behind 2","Pushed behind 3","Pushed behind 4","Running 1","Running 2","Running 3","Running 4","Sexy 1","Sexy 2","Sexy 3","Sexy 4","Vomit 1","Vomit 2","Vomit 3","Vomit 4","Pick up 1","Pick up 2","Pick up 3","Pick up 4","Creep 1","Creep 2","Creep 3","Creep 4","Creep 5","Jive 1","Jive 2","Jive 3","Jive 4","Jive 5","Vomit 5","Teeter 1","Teeter 2","Teeter 3","Teeter 4","Teeter 5","Totter 1","Totter 2","Totter 3","Totter 4","Reward","Punishment"
];