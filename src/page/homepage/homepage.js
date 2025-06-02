import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import HomeCard from "../../components/homecard/homecard";
import "../../style/style.css";

function Homepage() {
	return (
		<section role="contentinfo" aria-label="Welcome page with logo">
			<Container fluid className="bg-color-custom">
				<Row className="main-row justify-content-center align-items-center" bg="primary">
					<HomeCard />
				</Row>
			</Container>
		</section>
	);
}

export default Homepage;