# Train Of Thought

### A linked mindmapping tool (multi-touch + speech recognition + Linked(Open)Data + keeping-your-flow-UI = quick semantic graph design)

#### PROJECT SETUP:

everything to be identified with URL(s):
1. user, followed by a LOGIN-BUTTON
2. THIS (shared) canvas or 'thoughtspace' to work/cooperate in
3. additional LINKspaces (aka triplestores) available from which concepts and relations can be referred to from within this thoughtspace. One could make entry convenient by a table like:

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


#### PRIMARY INTERACTION:
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
 ̶1 > > > ̶1           1
 ^       ^          \/
 ^   +------------------------------------------+
 ^   | if (1 on Node) ==> showingAvailableLINKs |
 ^   |           else ==> ListeningForConceptA  |
 ^   +------------------------------------------+
 ^                 \/
 ^                  2< < < < < < < < < < < < < < < < < < < < < <2
 ^                 \/                                           ^
 ^   +-----------------------------------------------------+    ^
 ^   | if (2 on Edge/Destination) ==> LinkIntoCanvas       |    ^
 ^   |                       else ==> ListeningForRelation |    ^
 ^   +-----------------------------------------------------+    ^
 ^                 \/                                           ^
 ^                  ƻ                                           ^
 ^                 \/                                           ^
 ^   +-------------------------------------------+              ^
 ^   | if (2 on Canvas) ==> ListeningForConceptB |              ^
 ^   +-------------------------------------------+              ^
 ^       \/        \/                                           ^
 ̶1< < < < ̶1         2> > > > > > > > > > > > > > > > > > > > > >2
</pre>

#### WRITE QUERIES TO FILTER, CHANGE TABS TO ALTERNATIVE VIEWS:
By adding SPARQL in a textbox, the user can filter the current representation.
I say current as more representations (e.g. N3, JSON-LD) are possible next to default one described in the diagram above (probably implemented in HTML5/SVG with RDFa embedded).


##### THINGS I STILL DOUBT ABOUT A BIT:
- Is there a clear divide between LINKspaces and ontologies?
- Can ontologies be created in thoughtspaces?
- Can I refer to a triple somewhere else, as not copying is the point of this all?
