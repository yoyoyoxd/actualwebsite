# R3fi website

## Suggestions/Corrections

If you would like to make a correction or addition to the website but are not familiar with developer tools, you can create an issue on Github with your feedback.


## Live local preview

To contribute to the website, you will need to install [Hugo](https://gohugo.io/) ([installation instructions](https://gohugo.io/getting-started/installing#quick-install)).

With Hugo installed, you can run the website locally and preview changes in real-time.

```
hugo server

# to include page drafts
hugo server -D
```

This will allow you to preview the website at `http://localhost:1313`

All content, text and links are stored in `content/en/` any changes made there will be visible in the preview instantly. 

Once your changes are made, regenerate the static version of the site by simply running:

```
hugo
```

Commit the changes and create a pull request.
