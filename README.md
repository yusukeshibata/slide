slideshow-generator
=====

Slideshow generator.  
Create single markdown source contents, and you can generate slideshow html.  
Generated html is completely runnable off-line.  

Built with react.

Demo
----
Demo is generated with the command below.
```
slideshow-generator https://raw.githubusercontent.com/facebookincubator/create-react-app/master/README.md -o index.html
```

[https://yusukeshibata.github.io/slideshow-generator](https://yusukeshibata.github.io/slideshow-generator)

Install
-------

```
npm install slideshow-generator -g
```

Commandline interface
---------------------

#### Development

Open server http://localhost:8080

```
slideshow-generator test.md -p 8080 -watch
```

#### Generate

```
slideshow-generator test.md -o test.html
```

Licence
-------
MIT
