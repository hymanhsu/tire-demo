import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TireHeader from "@/components/header";
import TireFooter from "@/components/footer";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tire of Crestmont",
  description: "Tire of Crestmont",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Tire of Crestmont</title>
      </head>
      <body className={inter.className}>
        <main>
          <Stack gap={5}>
            <div className="p-2">
              <TireHeader />
            </div>
            <div className="p-2">
              <Container>
                <Row>
                  <Col></Col>
                  <Col xs={6}>{children}</Col>
                  <Col></Col>
                </Row>
              </Container>
            </div>
            <div className="p-2">
              <TireFooter />
            </div>
          </Stack>
        </main>
      </body>
    </html>
  );
}
