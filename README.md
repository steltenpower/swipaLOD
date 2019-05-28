# Train of thought (formerly sketch-a-LOD)

### A linked mindmapping tool (multi-touch + speech recognition + Linked(Open)Data + keeping-your-flow-UI = quick semantic graph design)

#### SETTINGS (write-out of 1_information-space-settings.jpg) :

everything to be identified with URL(s):
1. user, followed by a LOGIN-BUTTON
2. THIS 'thoughtspace' to work/cooperate in
3. additional LINKspaces (aka triplestores) available in this thoughtspace. One could make entry convenient by a table like:

   |checkbox|name                      |URL              |
   |--------|--------------------------|-----------------|
   |      V |DBpedia                   |https://...      |
   |        |WikiData                  |https://...      |
   |      V |WorldCat                  |https://...      |
   |        |my dataPOD                |https://inrupt...|
   |      V |John Doe's dataPOD        |https://...      |
   |        |name of other thoughtspace|https://...      |
   |        |uni's personnel reg.      |https://...      |
   |      V | enter name               | enter URL       |

4. ontologies available in this thoughtspace. One could make entry convenient by a table like:

   |checkbox|name                    |URL        |
   |--------|------------------------|-----------|
   |      V |DC(Dublin Core)         |https://...|
   |        |schema.org              |https://...|
   |      V |FOAF(Friend Of A Friend)|https://...|
   |      V | enter name             | enter URL |

// Is there a clear divide between LINKspaces and ontologies?
// Can ontologies be created in thoughtspaces?
// Can I refer to a triple somewhere else, as not copying is the point of this all?


#### INTERACTION (write-out of 2_primary-User-Interaction.jpg) :
Train-Of-Thought combines multi-touch with speech recognition (fallback: typing for quick edit) for quickly drawing a semantic graph;
While listening for concepts, matches are searched for in the available LINKspaces, plus general English is used to name new-to-define concepts. Appearing lists of options don't need a choice immediately; just keep drawing (while options load and logic filters them).
Next to what the ontologies define, also 'undefined' is a valid relation type. Connecting to nodes with a 'relFinder' edge will be interpreted as finding a relation in available LINKspaces with http://www.visualdataweb.org/relfinder.php
Nodes are drawn or selected where the screen is touched.
Relation types are shown along the edge is between.
The following state diagram defines the main user-interaction, for 2 fingers with touch down (1,2) and touch up (~1~,~2~) events:

<pre>
+------------------+
| WAITING FOR USER | 
+------------------+
     ^          \/
 ̶1> > > ̶1           1
^    ^          \/
^  +------------------------------------------+
^  | if (1 on Node) ==> showingAvailableLINKs |
^  |           else ==> ListeningForConceptA  |
^  +------------------------------------------+
^               \/
^                2< < < < < < < < < < < < < < < < < < < < < <2
^               \/                                           ^
^  +-----------------------------------------------------+   ^
^  | if (2 on Edge/Destination) ==> LinkIntoCanvas       |   ^
^  |                       else ==> ListeningForRelation |   ^
^  +-----------------------------------------------------+   ^
^               \/                                           ^
^                ƻ                                           ^
^               \/                                           ^
^  +-------------------------------------------+             ^
^  | if (2 on Canvas) ==> ListeningForConceptB |             ^
^  +-------------------------------------------+             ^
^       \/         \/                                        ^
 ̶1< < ̶1          2> > > > > > > > > > > > > > > > > > > > > >2
</pre>

#### FILTERED VIEWS (write-out of 3_other-filtered-views.jpg) :
Next to the INTERACTION described above, being the default Train-Of-Thought view (made in SVG+RDFa probably), many more visualisations and data notations (e.g. N3, JSON-LD) are possible; use the tabs to switch.
You can filter any view, by adding SPARQL in the textbox below.
