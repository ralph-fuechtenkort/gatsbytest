import React from 'react';
import './TalentDetails.css'

const TalentDetails = ({ item, dynamicPageItem }) => {
    const post = dynamicPageItem;
    const renderHTML = (html) => {
        return { __html: html };
    }
    return (
        <section className="talent-details">
            <div className="container">
                <div className="talent">
                    <h1>{post.customFields.name}</h1>
                    {post.customFields.uglyPicture &&
                        <img src={post.customFields.uglyPicture.url + '?w=860'} alt="" />
                    }
                    <hr />
                    <div className="talent-content" dangerouslySetInnerHTML={renderHTML(post.customFields.description)}></div>
                </div>
            </div>
        </section>
    );
}
export default TalentDetails;
