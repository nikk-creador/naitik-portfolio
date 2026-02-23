import React from "react";
import { Layout } from "antd";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { NAV_SECTIONS } from "./data/Home";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingIconBackdrop from "./components/layout/FloatingIconBackdrop";
import Home from "./components/sections/Home";
const BlogDetail = React.lazy(() =>
  import("./components/sections/Blog").then((module) => ({
    default: module.BlogDetail,
  })),
);

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  width: 100%;
  background: transparent;
  position: relative;
`;

const StyledContent = styled(Content)`
  flex: 1;
  background: transparent;
  padding-top: 0;
  position: relative;
  z-index: 1;
`;

const App: React.FC = () => {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <StyledLayout>
        <FloatingIconBackdrop />
        <Navbar sections={NAV_SECTIONS} />
        <StyledContent>
          <React.Suspense fallback={null}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
              </Routes>
            </AnimatePresence>
          </React.Suspense>
        </StyledContent>
        <Footer />
      </StyledLayout>
    </BrowserRouter>
  );
};

export default App;
