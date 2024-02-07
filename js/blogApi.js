function fetchBlogData() {
    const baseUrl = 'https://bytesandbranchesmvc-production.up.railway.app';

    fetch(`${baseUrl}/api/BlogPosts1/portfolio/3`)
        .then((response) => response.json())
        .then(function(data) {
            displayBlogData(data, baseUrl);
        });
}

function displayBlogData(blogPosts, baseUrl) {

    let template = document.getElementById('blog-template');
    let blogSection = document.getElementById('blogs');

    blogPosts.forEach((blogPost) => {
        const blogPostCard = document.importNode(template.content, true);
        
        //format image
        let imageDiv = blogPostCard.querySelector('[data-blog="imageLink"]');
        imageDiv.setAttribute(
            "href",
            `${baseUrl}/content/${blogPost.slug}`
        );

        imageDiv.href = `${baseUrl}/content/${blogPost.slug}`;

        // let imgTag = document.createElement('img');
        let imgTag = blogPostCard.querySelector('.blog-image');
        imgTag.setAttribute(
            "src",
            `data:${blogPost.imageType};base64,${blogPost.imageData}`
        );

        let blogTitleDiv = blogPostCard.querySelector('[data-blog="title"]');
        blogTitleDiv.innerHTML = blogPost.title;

        let blogDate = new Date(blogPost.createdDate);
        let month = blogDate.toLocaleString('default', { month: 'long' });
        let day = blogDate.getDate();

        //add day
        let blogDayDiv = blogPostCard.querySelector('[data-blog="day"]');
        blogDayDiv.innerHTML = day;

        //add month
        let blogMonthDiv = blogPostCard.querySelector('[data-blog="month"]');

        blogMonthDiv.innerHTML = month;

        //add content
        let blogContentDiv = blogPostCard.querySelector('[data-blog="content"]');
        blogContentDiv.innerHTML = blogPost.abstract;

        //readmore link
        let blogLink = blogPostCard.querySelector('[data-blog="readMoreLink"]');
        blogLink.setAttribute(
            "href",
            `${baseUrl}/content/${blogPost.slug}`
        );

        let blogPubDate = blogPostCard.querySelector('[data-blog="publishedDate"]');

        let dateToday = new Date();
        let createdDate = new Date(
            blogPost.Updated != null ? blogPost.updatedDate : blogPost.createdDate
        );
        let diffTime = Math.abs(dateToday.getTime() - createdDate.getTime());
        let lastUpdated = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (lastUpdated == 1) {
            blogPubDate.innerHTML = `Published ${lastUpdated} day ago`;
        } else {
            blogPubDate.innerHTML = `Published ${lastUpdated} days ago`;
        }

        blogSection.appendChild(blogPostCard);
    });

}