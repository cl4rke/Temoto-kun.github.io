/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-03-05
 */

(function () {
    var articleTemplate = Handlebars.compile(document.getElementById('/templates/article').innerHTML);

    superagent
        .get('prebuilt/articles.json')
        .end(function (err, res) {
            var script = document.createElement('script');
            res.body.forEach(function (article) {
                document.getElementsByTagName('main')[0].innerHTML += articleTemplate(article);
            });
            script.src = 'prebuilt/script.js';
            script.type = 'text/javascript';
            document.head.appendChild(script);
        });
})();
