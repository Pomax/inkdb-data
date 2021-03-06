# Open Source Fountain Pen Ink data

So here's an interesting idea: **Let's open source data about fountain pen inks.**

Who makes what? Is it expensive? Does it flow well? Lots of feathering? Is it a uniform color, or does it majestically shade? What about if you use it with a semi-flex or flex nib? What does any of that even mean??

## Why open source?

I'm a firm believer that the internet is for hosting the world's aggregate body of knowledge. Some of that knowledge is encyclopaedic (which depending on when you came online, might mean about.com, google, wikipedia, stack exchange, quora, and many more places like them), and some of that knowledge is extremely specialised and found in hard to find forums and personal webpages.

I happen to like arting, and I don't want to have to spend days on the internet, and weeks in shops, just to get a basic understanding of a small number of fountain pen inks. This is what the internet is supposed to be for, so let's make that happen: I submit to you, and the entire world, the world's first open source fountain pen ink data repository.

# Contributing your knowledge

I'm only one person, and there's only so much I can do (even if what I've done so far could be considered obsessively elaborate. I don't think it is, but then again my opinion doesn't matter in this particular case) so the only way the world's going to get all the information on all the inks that are commercially available for fountain pens is going to be a group effort. In fact, you don't even need to have done any ink work yourself to help out:

## Found a link to an ink review? Give a shout-out!

Just because you don't want to sit down and analyse fountain pen inks yourself (and let's be honest: why on earth would you, it's tedious! Some of us love that, but then some people also like playing "XCOM: Enemy Within" on classic difficulty) does not mean you can't help out.

Have you seen an ink review on a forum, or someone's homepage, and you think it's elaborate and worthwhile for the rest of the world to know about? Create a [new issue](https://github.com/Pomax/inkdb-data/issues/new) on this repo to have it added as a "review" link for the associated ink!

## Written an ink review that you think should be linked?

You are a hero to fountain pen users world wide, and I would love to add the link for your review to this data set. People should be able to easily find your review, even if it's not been published through the more well known fountain pen forums or pen websites.

## Own an ink and want to rate it?

If you own a particular ink, and you like writing with it, whether you realise it or not you are the perfect person to say something about that ink! While writing a detailed review of an ink takes time and practice, and is greatly appreciated by the rest of the fountain pen using world, you don't *need* to go quite that in-depth to make a contribution: why not simply [rate your ink](https://encrypted.google.com/search?hl=en&q=in+progress) in terms of what you feel you're qualified to rate? Does it flow well? How much did it cost you? Is it a little sedimenty if you leave the bottle standing for a while? Maybe it's a fluerescent or even highlighter ink! Simply tick some boxes, and in less than a minute, feel good about yourself for having helped improve the body of knowledge that the world can tap into! 
  
# Are you also a programmer? Let's talk code for a moment!

Data alone is not enough. Putting something like this online without an API, and without some sensible code backing it, would make it mostly useless. Also, while we could get fancy with SQL/ORM/etc. there really are only so many inks for sale on the planet at any one time, and there's a fair number of companies that make fountain pen inks, but that number is also relatively low in terms of model storage. We're talking less than 100 companies of wihch the vast majority produce vastly fewer than 100 inks...

## Building the data

For development, this data uses `node.js`, with `npm` for testing and building. If you change any data, first force a rebuild to test your changes:

`$> npm test`

If that passes, run a true build:

`$> npm run build`

This will yield a new `index.js` and source map for use in the browser.

### Using the library in the browser

Include index.js as a script: `<script src="index.js"></script>` should be all you need.

### Using the library in Node

Require the library as you would any other, after installing it.

`$> npm install inkdb-data --save`

And then in your code:

```
var Inkdata = require("inkdb-data");
Inkdata.loadAPI(function(err, api) {
  var inks = api.getInks();
  var companies = api.getCompanies();
  console.log("loaded " + inks.length + " inks, from " + companies.length + " companies");
});
```

## Data storage

Let's make things simple: flat files for everyone, with the data stored in .json format, because it's very easy to read for both humans and computers, and writing API connectors based on a file system might requiring a bit of memory mapping, but let's be honest: 100 companies with 100 inks each, and each ink model needing about 2kb worth of text to model is still only 20MB. Even on the cheapest, lowest end hardware (let's say, a $35 Raspberry Pi B+), using up 20MB, or ever 40MB, for serving up the entire planet's fountain pen ink data, is nothing. 

## Code and layout

Inks are stored in the FS as directories for companies, with subdirectories for ink line (if relevant), with individually identifiable inks names based on "the ink's name" as a .json file, so that if we want the profile for De Atramentis's "Petrol", we'd be able to cat its data as:

```
$> cat ./data/De Atramentis/Petrol.json
```

Similarly, if we wanted to find Pelikan's "Mandarin", which is an "Edelstein" line ink, we could cat it as:

```
$> cat ./data/Pelikan/Edelstein/Mandarin.json
``` 

The API process simply taps into the file system (either "real", insofar as that's a thing, or a virtual file system) and aggregates the data stored into an easy to query object. Let's talk APIs for a moment:

### Querying the data: the API

In order to make everyone's lives easier, there's a simple API that we can all tap into (or implement for different languages if needed) in order to get data out:

- `api.getCompanies()` → array of strings

  Get the list of companies that produce fountain pen inks. 

- `api.get(<company name>)` → portfolio

  Get a company's portofolio. A portfolio comes with its own API, covered below. If there is no company by the name given, the result will be `false`.

- `api.get(<company>, <ink line>, <inkname>)` → ink

  Directly access individual inks, based on a company name, ink line name (set to `false` if not needed), and ink name. Inks have their own API, covered below. This function may return `false` or and empty array if noting can be found.

#### Portfolio

- `portfolio.getName()` → string

  A reflective function to get the name of company this portolio belongs to.

- `portfolio.getInkLines()` → array of inklines

  Get the inklines sold by this company. Inklines have their own API, covered below.

- `portfolio.getInkLine(<ink line>)` → inkline

  Get a single inklines sold by this company. If the company does not manufacture a line by the name given, the result will be `false`.

- `portfolio.getInks()` → array of inks

  Get all inks in this company's portfolio, irrespective of ink links. Inks have their own API, covered below.


#### Inkline

- `inkline.getCompany()` → string

  A  reflective function to get the name of company this ink line belongs to.

- `inkline.getName()` → string

  A reflective function to get the name of this ink line.

- `inkline.getInks()` → array of inks

  Get all inks in this ink line. Inks have their own API, covered below.

#### Ink

- `ink.getCompany()` → string

  A reflective function to get the name of company this ink belongs to.
 
- `ink.getInkline()` → string

  A reflective function to get the name of ink line this ink belongs to.

- `ink.getName()` → string

  A reflective function to get the name of this ink.

- `ink.getColors()` → array of {r:integer,g:integer,b:integer} objects

  Yields the list of colors associated with this ink, with the dominant ink listed first. Not all inks have uniform colors, and especially highly shading inks will have at least two, sometimes more, colors as part of their profile. 

- `ink.getColorComposition()` → array of {r:integer,g:integer,b:integer} objects

  Yields the list of colors contained by this ink, as determined by chromatographic analysis.

- `ink.getReviews()` → array of URLs

  Get a list of reviews for this ink on the internet 

- `ink.getNotes()` → array of notes (plain text strings)

  Get a list of notes relevant to this ink.
  
- `ink.getRetailers()` → array of URLs

  Get a list of retail URLs where this ink can be purchased.
  
- `ink.getProperties()` → properties

  Get an ink's qualitative properties like dry time, cost, etc. The list of properties is as follows:

##### Properties

The best way to model the vales for the following properties is still being worked out (and more properties might be required) but for the moment there will be the following properties available (although currently these will always report `false` as their value):

- drytime
- flow
- shading
- nibtype
- cost
- fluorescence
- solution
- deposit
- rating

# Can anyone use this data?

Short answer: yes.

Longer answer: yes, but the data is licensed under a share-and-share-alike license, and you got this data because of the hard work of others, so if you can, please help improve it.
