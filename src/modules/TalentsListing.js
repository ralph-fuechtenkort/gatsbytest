import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby'
import { cleanHTML} from '../agility/utils'
import truncate from 'truncate-html'
import './TalentListing.css'
import Img from 'gatsby-image'

export default (props) => (
	<StaticQuery
		query={graphql`
        query TalentsListingModuleQuery {
            allAgilityTalent(
              filter: {
                properties: { referenceName: { eq: "talents"}}
              },
              limit: 10
            ) {
                totalCount
                nodes {
                    contentID
                    customFields {
                        name
                        birthDate,
                        description
                        uglyPictureLocalImg {
                            childImageSharp {
                                fluid(quality: 90, maxWidth: 480, maxHeight: 350) {
                                  ...GatsbyImageSharpFluid
                                }
                              }
                        }
                    }
                    sitemapNode {
                        pagePath
                    }
                    properties {
                        referenceName
                    }
                }
            }
          }
        `}
		render={queryData => {
			return (
				<TalentsListing talents={queryData.allAgilityTalent.nodes} {...props} />
			);
		}}
	/>
)

const TalentsListing = ({ item, talents }) => {
    return (
        <section className="talents-listing" >
            <div className="container">
                <h1>{item.customFields.name}</h1>
                <div className="talents-listing-container">
                    <Talents talents={talents} />
                </div>
            </div>
        </section>
    )
}

const Talents = ({ talents }) => {
    return talents.map(talent => {
        return <Talent key={talent.contentID} talent={talent} />;
    })
}

const Talent = ({ talent }) => {
    
    if(!talent.sitemapNode) return;
    return(
        <div className="talents" key={talent.contentID}>
            <Link to={talent.sitemapNode.pagePath}>
                <TalentImage image={talent.customFields.uglyPictureLocalImg} label={talent.customFields.uglyPicture ? talent.customFields.uglyPicture.label : `Talent Image`} />
                <h2>{talent.customFields.name}</h2>
                <TalentExceprt htmlContent={talent.customFields.description} />
            </Link>
        </div>
    )
}

const TalentImage = ({ image, label }) => {
    let imageToRender = null;
    
    if(image && image.childImageSharp) {

        imageToRender = <Img fluid={image.childImageSharp.fluid} alt={label} /> 
    }
    return imageToRender;
}

const TalentExceprt = ({ htmlContent }) => {
    const renderHTML = () => {
        const excerpt = truncate(cleanHTML(htmlContent), { stripTags: true, length: 160 });
		return { __html: excerpt };
    }
    return(<p dangerouslySetInnerHTML={renderHTML()}></p>)
}
