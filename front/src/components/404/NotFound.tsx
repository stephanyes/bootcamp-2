import React, { ReactNode } from 'react';
import { Container, Row, Col } from "reactstrap";
import styles from "../404/notfound.module.css"

class NotFound extends React.Component<{}, {}> {
	render(): ReactNode {
		return (
			<Container>
				<Row>
					<Col xs={12} className={styles.NotFound}>
						<div className={styles.NotFoundBody}>
							<h1 className={styles.NotFoundTitle}>404</h1>
							<h3 className={styles.NotFoundDescription}>Page not found</h3>
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}
export default NotFound;
