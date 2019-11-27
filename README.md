# Train Of Thought

### (An idea for) a linked mindmapping tool (multi-touch + speech recognition + [Linked(Open)Data](https://en.wikipedia.org/wiki/Linked_data) + keeping-your-flow-UI = quick semantic graph design)

*The idea from a user point of view is at the moment best shown in the drafts photographed and saved here as user-A-..., user-B-..., user-C-..., etc. :*

[A-title](https://raw.githubusercontent.com/steltenpower/Train-Of-Thought/master/user-A-title.jpg)

[B-select-LDcloud](https://raw.githubusercontent.com/steltenpower/Train-Of-Thought/master/user-B-select-LDcloud.jpg)

[C-draw-triple](https://raw.githubusercontent.com/steltenpower/Train-Of-Thought/master/user-C-draw-triple.jpg)

[D-extend-visual-reasoning](https://raw.githubusercontent.com/steltenpower/Train-Of-Thought/master/user-D-extend-visual-reasoning.jpg)

[E-find-routes](https://raw.githubusercontent.com/steltenpower/Train-Of-Thought/master/user-E-find-routes.jpg)

[F-views-and-filters](https://raw.githubusercontent.com/steltenpower/Train-Of-Thought/master/user-F-views-and-filters.jpg)

[G-github-END](https://raw.githubusercontent.com/steltenpower/Train-Of-Thought/master/user-G-github-END.jpg)

Only for more technical (and slightly outdated compared to these photographs) details, keep reading

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

#### WRITE QUERIES TO FILTER, CHANGE TABS TO ALTERNATIVE VIEWS:
By adding SPARQL in a textbox, the user can filter the current representation.
I say current as more representations (e.g. N3, JSON-LD) are possible next to default one described in the diagram above (probably implemented in HTML5/SVG with RDFa embedded).


##### THINGS I STILL DOUBT ABOUT A BIT:
- Is there a clear divide between LINKspaces and ontologies?
- Can ontologies be created in the canvas?
- The principle of linked data is nicely shown in https://research.csiro.au/oznome/wp-content/uploads/sites/35/2017/06/image2016-12-6-11-30-49.png , but can I also refer in the canvas to a triple somewhere else, as not copying is the point of this all? Sort of, see http://patterns.dataincubator.org/book/reified-statement.html
OR does it need RDF*'s Lois Lane construct as mentioned in https://douroucouli.wordpress.com/2019/07/11/proposed-strategy-for-semantics-in-rdf-and-property-graphs/ ?
- As syntax of SPARQL queries is very similar to one of the RDF notations, can this tool be used to create SPARQL queries?




####Coding hints for multi-touch:

- https://github.com/jquery/PEP
- http://usefulangle.com/post/28/javascript-handling-multi-touch-with-pointer-events
- https://technet.microsoft.com/en-us/windowsserver/hh673557(v=msdn.10).aspx
- https://www.sitepoint.com/unifying-touch-and-mouse-with-pointer-events/
- https://github.com/mdn/dom-examples/blob/master/pointerevents/Multi-touch_interaction.html
- https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Pinch_zoom_gestures
- https://patrickhlauke.github.io/touch/
- https://docs.microsoft.com/en-us/windows/uwp/design/input/handle-pointer-input
- https://w3c.github.io/pointerevents/
- http://steltenpower.com/pointers.html 
