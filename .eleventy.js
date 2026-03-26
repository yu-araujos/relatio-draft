module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/robots.txt");
  eleventyConfig.addPassthroughCopy("./src/sitemap.xml");
  return {
    pathPrefix: "/relatio-draft/",
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
