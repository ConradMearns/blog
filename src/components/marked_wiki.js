export const make_extension = (resolver, instance, wrapper) => {
  return {
    extensions: [
      {
        name: "marked_wiki",
        level: "block",
        start(src) {
          return src.match(/\!\[\[/)?.index;
        },
        tokenizer(src) {
          const rule = /^!\[\[([^[\]]*)\]\]/;
          const match = rule.exec(src);
          if (match) {
            return {
              type: "marked_wiki",
              raw: match[0],
              text: this.lexer.inlineTokens(match[1].trim()),
              image: null,
              resolved: null,
            };
          }
        },
        renderer(token) {
          if (token.image) {
            return `<img src=${token.image} alt="${token.raw}" />`;
          }else if (token.resolved) {
            return token.resolved
          } else {
            return `${this.parser.parseInline(token.text)}`;
          }
        },
      },
    ],
    async: true, // needed to tell marked to return a promise
    async walkTokens(token) {
      if (token.type === "marked_wiki") {
        // TODO: danger, error conditions not tested for
        const data = token.text[0].text;
        const res = await resolver(data);

        if (res && res.type.match("image.*")) {
          token.image = URL.createObjectURL(res);
        }

        else if(res && res.type.match("text.*")) {
          token.resolved = await res.text()
          token.resolved = await instance(token.resolved)
          if (wrapper) {
            token.resolved = await wrapper(token.resolved)
          }
        }
      }
    },
  };
};
