import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Header = styled.div`
`;

const Content = styled.div`
max-height: ${props => props.maxHeight}px;
overflow: hidden;
position: relative;
`;

const ReadMore = styled.div`
cursor: pointer;
margin-top: 10px;
text-align: right;
`;

const Gradient = styled.div`
display: block;
position: absolute;
bottom: 0;
left: 0;
right: 0;
height: 25px;
z-index: 1;
background-image: linear-gradient( to bottom, rgba( 22,32,45,0) 5%, rgba( 22,32,45,.95) 95%);`

const Footer = styled.div`
`;

const Container = styled.div`
border-bottom: 2px solid #fff;
margin-bottom: 10px;
`;

export default function Comment({ text, maxHeight }) {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {

    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  useEffect(() => {
    if (height > maxHeight)
      setIsCollapsed(true);
  }, [height, maxHeight]);

  function handleExpand() {
    setIsCollapsed(false);
  }

  return (
    <Container>
      <Header />
      {text &&
        <Content ref={measuredRef} maxHeight={isCollapsed && maxHeight}>
          <Typography variant="body2" gutterBottom>
            {text}
          </Typography>
          {isCollapsed && <Gradient />}
        </Content>
      }
      {
        isCollapsed &&
        <ReadMore onClick={handleExpand}>
          <Typography variant="button" display="block" color="primary">
            Read more
          </Typography>
        </ReadMore>
      }
      <Footer />
    </Container>
  )
}
