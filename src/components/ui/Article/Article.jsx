import { Avatar, Box, Flex, Image, Tag, useMediaQuery } from "@chakra-ui/react";
import { format } from "date-fns";
// eslint-disable-next-line import/no-extraneous-dependencies
import Markdown from "markdown-to-jsx";

import "./Article.css";

export default function Article() {
  const [isLargerThan888] = useMediaQuery("(min-width: 888px)");
  const avatar = isLargerThan888 ? <Avatar name="Anonymouse User" src="" /> : null;

  return (
    <article>
      <Box
        mt="26px"
        mb="26px"
        padding="16px"
        backgroundColor="#fff"
        maxW="941px"
        ml="auto"
        mr="auto"
        boxShadow="0 4px 12px 0 #00000026"
        borderRadius="5px"
        position="relative"
      >
        <Flex>
          <h2
            style={{
              fontSize: "20px",
              color: "#1890FF",
              maxWidth: "655px",
            }}
          >
            Article title about title and about titleout title and about titleout title
            and about title
          </h2>
          <Box minWidth="141px" ml="auto">
            <Flex>
              <Flex flexDirection="column" mr="12px">
                <p style={{ fontSize: "18px", fontWeight: "bold", whiteSpace: "nowrap" }}>
                  Anonymouse User
                </p>
                <p style={{ fontSize: "12px", color: "#00000080", textAlign: "end" }}>
                  {format(new Date().toISOString(), "PP")}
                </p>
              </Flex>
              {avatar}
            </Flex>
          </Box>
        </Flex>
        <Box maxW="700px">
          <Tag
            mr="5px"
            mb="5px"
            backgroundColor="transparent"
            border="1px solid black"
            borderRadius="3px"
          >
            tag1
          </Tag>
          <p style={{ fontSize: "12px", color: "#00000080" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </Box>
        {/* Сделать markdown с помощью какой-нибудь либы */}
        <Box mt="50px" className="Box">
          <Markdown>
            {`__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with 
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as 

Start numbering with offset:

57. foo
1. bar


## Code

Inline 

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

Sample text here...

Syntax highlighting


## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## Plugins

The killer feature of markdown-it is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).


### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :cry: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O


### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++


### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==


### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.


### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b


### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
*here be dragons*
:::`}
          </Markdown>
        </Box>
        <button
          type="button"
          style={{ position: "absolute", top: "70px", right: "10px" }}
        >
          <Flex transform="translate(-10px, 7px)">
            <Image padding="0" src="/unliked.svg" alt="" boxSize="20px" mr="2px" />
            <span style={{ fontSize: "12px" }}>12</span>
          </Flex>
        </button>
      </Box>
    </article>
  );
}
