This blog is managed with [Hugo](https://gohugo.io/).

## Installation

You need the `hugo` binary.

The theme is a git submodule, so you need to update it separately:

``` shell
git submodule init
git submodule update
```

## Local blogging

``` shell
hugo server # start the local webserver
hugo new posts/my-first-post.md # regular old post
hugo new aanbevelings/obs-de-regenboog-maastricht.md # for a recommendation
```

## Deployment

Push to `master` and [Netlify](https://netlify.com/) takes it from there.

## Questions?

Ask [Space Babies](https://www.spacebabies.nl/).
