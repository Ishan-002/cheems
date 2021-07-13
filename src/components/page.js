import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
// material
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', ...other }, ref) => (
  <Box ref={ref} {...other}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </Box>
));

export default Page;
