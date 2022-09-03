// Q1
$('h1').addClass('highlight');

// Q2
$('#site_title').addClass('highlight');

// Q3
$('article li').addClass('highlight');

// Q4
$('article li').eq(2).addClass('highlight');

// Q5
$('table tr:odd').addClass('highlight');

// Q6
$('li li:contains("ac ante")').parents('li').addClass('highlight');

// Q7
$('li li:contains("ac ante")').next().addClass('highlight');

// Q8
$('table td').last().addClass('highlight');

// Q9
$('table td:not(".protected")').addClass('highlight');

// Q10
$('a[href^="#"]').addClass('highlight');

// Q11
$('[class*="block"]').addClass('highlight');