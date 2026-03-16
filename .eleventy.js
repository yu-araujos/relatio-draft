module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets");
  return {
    pathPrefix: "/relatio-draft/",
    dir: {
      input: "src", 
      output: "_site"    
    }
  };
};