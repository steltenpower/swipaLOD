# Train of Thought
(mindmapping with the power of Linked Data in your fingertips. A web application)

In our associative brains information is linked, forming a network.
Many people communicate subsets visually through free-form mindmaps, or more structured diagrams often on paper or whiteboards, sometimes with specialized software.

In machines through standardized notation and vocabularies a similar associating is named Linked Data, simplified:
- A statement called a **triple**: _Something A_ has some kind of _relation R_ with _something B_.
- A **graph**: a collection of connected triples.
- Triples pointing from one graph to another graph somewhere else, allow for **querying a combination of graphs**, for which answers can be immediately visualized.

Train-of-Thought is an envisioned combination of much of the visual freedom of mindmapping, possibly faster than freehand, with the standardized reasoning power of Linked Data:
- With the flick of a finger a triple is drawn on the ‘visual reasoning canvas’; an arrow with 3 locations for **optional** text: before+along+after. With speech recognition one could fill any or all of those text locations during the flicking already, as faked in https://steltenpower.github.io/flowchat/. Or just type it afterwards.
- Text fields get (a list of) “Did you mean …?” options below, found in external databases and vocabularies to pick. These suggestions can be anything in between very basic and a smart combination of speech recognition, graph reasoning and statistics combined.
- External nodes referred to in canvas, will when touched temporarily show their external relations, which can be selected to stay visible (a sort of Googling within the same interaction context). Touching multiple nodes shows routes between them using [RelFinder](http://www.visualdataweb.org/relfinder.php).
- A query-builder and result visualizer as known from WikiData gives reasoning power, with almost no coding needed by the user still.
- Created data will be shareable to other Linked Data users and projects.
- Live sharing a.k.a. multi-user mode, might result in several cooperation styles: cleaning/specifying/growing/discussing
- The tool should be almost as fast to operate as your train of thought. Hence, the name. Because of that and needing to fit not only small graphs on screen, interaction should not everywhere need visual indicators taking up space all the time. Content is king, right?
- Maybe it can be nicely combined with [Knowledge Dock](https://github.com/steltenpower/KnowledgeDock).
One allows the user sloppyness in manually drawing a graph, the other allows the user to type a text. In both cases the computer suggests more specific meaning. Maybe they can be synchronized for the current result or maybe even through time by scrolling the story.
- of course all sorts of custom views can be added
- Search engines love RDF(a) too.

# >> WARNING: below is a bit of an outdated mess <<



<img src="https://repository-images.githubusercontent.com/103260748/0559bb80-72a1-11eb-9df9-7ef50042c55f">

### (An idea for) a linked mindmapping tool (multi-touch + speech recognition + [Linked(Open)Data](https://en.wikipedia.org/wiki/Linked_data) + keeping-your-flow-UI = quick semantic graph design)

*The idea from a user point of view is at the moment best shown in these photographed drafts:*

![A-title](https://raw.githubusercontent.com/steltenpower/Train-Of-Thought/master/user-A-title.jpg)

![B-select-LDcloud](https://raw.githubusercontent.com/steltenpower/Train-Of-Thought/master/user-B-select-LDcloud.jpg)

![C-draw-triple](https://raw.githubusercontent.com/steltenpower/Train-Of-Thought/master/user-C-draw-triple.jpg)

![D-extend-visual-reasoning](https://raw.githubusercontent.com/steltenpower/Train-Of-Thought/master/user-D-extend-visual-reasoning.jpg)

![E-find-routes](https://raw.githubusercontent.com/steltenpower/Train-Of-Thought/master/user-E-find-routes.jpg)

![F-views-and-filters](https://raw.githubusercontent.com/steltenpower/Train-Of-Thought/master/user-F-views-and-filters.jpg)

![G-github-END](https://raw.githubusercontent.com/steltenpower/Train-Of-Thought/master/user-G-github-END.jpg)

Only for more technical (and slightly outdated compared to these photographs) details, keep reading ...



#### PROJECT SETUP:

everything to be identified with URL(s):
1. user, followed by a LOGIN-BUTTON
2. THIS (shared) reasoning canvas to work/cooperate in
3. additional LINKspaces (aka triplestores) available from which concepts and relations can be referred to from within this canvas. One could make entry convenient by a table like:

   |checkbox|name                       |URL                                   |
   |--------|---------------------------|--------------------------------------|
   |      V |DBpedia                    |https://...                           |
   |        |WikiData                   |https://...                           |
   |      V |WorldCat                   |https://...                           |
   |        |my dataPOD                 |https://inrupt...                     |
   |      V |John Doe's dataPOD         |https://...                           |
   |        |name of other thoughtspace |https://...                           |
   |        |uni's personnel reg.       |https://...                           |
   |      V | _ _ _ enter name _ _ _    | _ _ _ enter URL _ _ _                |
   |        | _ _ _ SEARCH _ _ _        | using https://lod-cloud.net/datasets |

4. ontologies available in this canvas. One could make entry convenient by a table like:

   |checkbox|name                     |URL                                           |
   |--------|-------------------------|----------------------------------------------|
   |      V |DC(Dublin Core)          |https://...                                   |
   |        |schema.org               |https://...                                   |
   |      V |FOAF(Friend Of A Friend) |https://...                                   |
   |      V | _ _ _ enter name _ _ _  | _ _ _ enter URL _ _ _                        |
   |        | _ _ _ SEARCH _ _ _      | using https://lov.linkeddata.es/dataset/lov/ |
   


#### PRIMARY INTERACTION:
Train-Of-Thought combines multi-touch with speech recognition (fallback: typing for quick edit) for quickly drawing a semantic graph;
While listening for concepts, matches are searched for in the available LINKspaces, plus general English is used to name new-to-define concepts. Appearing lists of options don't need a choice immediately; just keep drawing (while options load and logic filters them).
Next to what the ontologies define, relation types can also be 'undefined' with "links to". Connecting to a node with a 'relFinder' edge will be interpreted as finding a relation in available LINKspaces with http://www.visualdataweb.org/relfinder.php
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
OR, as most screens of any decent size are not multi-touch, better stick to single-touch/mouse
<pre>
ARB=DOWN_ON_CANVAS,SPEAK_A,START_MOVING,SPEAK_R,UP,SPEAK_B,SILENCE
A=DOWN_ON_CANVAS,SPEAK_A,UP
RB=,START_MOVING_ON_A_OR_CANVAS_AS_IMPLIED_A,SPEAK_R,UP,SPEAK_B
SHOW_PROPS_OR_HIDE=CLICK_NODE, SELECT_PROPS=CLICK_PROP
</pre>

#### WRITE QUERIES TO FILTER, CHANGE TABS TO ALTERNATIVE VIEWS:
By adding SPARQL in a textbox, the user can filter the current representation.
I say current as more representations (e.g. N3, JSON-LD) are possible next to default one described in the diagram above (probably implemented in HTML5/SVG with RDFa embedded).


##### THINGS I STILL DOUBT ABOUT A BIT:
- Is there a clear divide between LINKspaces and ontologies?
- Can ontologies be created in the canvas?
- The principle of linked data is nicely shown in https://research.csiro.au/oznome/wp-content/uploads/sites/35/2017/06/image2016-12-6-11-30-49.png , but can I also refer in the canvas to a triple somewhere else, as not copying is the point of this all? Sort of, see http://patterns.dataincubator.org/book/reified-statement.html
OR does it need RDF*'s Lois Lane construct as mentioned in https://douroucouli.wordpress.com/2019/07/11/proposed-strategy-for-semantics-in-rdf-and-property-graphs/ ?
- As syntax of SPARQL queries is very similar to one of the RDF notations, can this tool be used to create SPARQL queries?




####Coding hints:

- https://www.ontotext.com/knowledgehub/fundamentals/what-is-rdf-star/

- https://github.com/jquery/PEP
- http://usefulangle.com/post/28/javascript-handling-multi-touch-with-pointer-events
- https://technet.microsoft.com/en-us/windowsserver/hh673557(v=msdn.10).aspx
- https://www.sitepoint.com/unifying-touch-and-mouse-with-pointer-events/
- https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Multi-touch_interaction
- https://patrickhlauke.github.io/touch/
- https://docs.microsoft.com/en-us/windows/uwp/design/input/handle-pointer-input
- https://w3c.github.io/pointerevents/
- http://steltenpower.com/pointers.html 
- https://m-ld.org/news/#collaboratenable

