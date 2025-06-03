import React, { useState } from "react";
import { Modal } from "@imephra06/pluginmodal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "../../style/style.css";

function Error() {
	const errorColor = "#93AD18";
	const errorMessage = "Error ! Requested page doesn't exist";
	const paramsModal = { bgColor: errorColor, Color: "white", link: "/" };

	const [openModal, setOpenModal] = useState(true);

	return (
		<section role="contentinfo" aria-label="navigation error modal">
			<Container fluid className="bg-color-custom">
				<Row className="main-row justify-content-center align-items-center" bg="primary">
					<Modal
						display={openModal}
						setDisplay={setOpenModal}
						message={errorMessage}
						params={paramsModal}
					/>
				</Row>
			</Container>
		</section>
	);
}

export default Error;