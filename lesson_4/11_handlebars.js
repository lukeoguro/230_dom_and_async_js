let posts = [
  {
    title: 'Lorem ipsum dolor sit amet',
    published: 'April 1, 2015',
    body: 'Sed ut <em>perspiciatis</em> unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
    tags: ['Food', 'Cooking', 'Vegetables'],
  },
  {
    title: 'voluptate velit',
    published: 'April 2, 2015',
    body: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.'
  },
]

$(() => {
  let postTemplate = Handlebars.compile($('#post').html());
  Handlebars.registerPartial('tag', $('#tag').html());

  for (let post of posts) {
    $('body').append(postTemplate(post));
  }
});