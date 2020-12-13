import React from "react"
import './LayoutTemplate.css'

export default ({ children }) => {
	return (
		<section className="section">
			<div className="container">
				
				{children}
				<p>Copyright by Fueko 2020</p>
			</div>

		</section>
	)
}

