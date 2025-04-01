import { Component } from 'react';
import { Box, Button, Typography, CircularProgress, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // Import the copy icon

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, isRetrying: false };
    this.handleRetry = this.handleRetry.bind(this);
    this.handleCopyError = this.handleCopyError.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo }); // Store errorInfo in state
  }

  handleCopyError() {
    const { error, errorInfo } = this.state;
    const errorDetails = `Error: ${error?.message}\nStack: ${errorInfo?.componentStack}`;
    navigator.clipboard.writeText(errorDetails).then(() => {
      alert('Error details copied to clipboard.');
    });
  }
  // Reload the page when retrying
  handleRetry() {
    this.setState({ hasError: false, error: null, errorInfo: null, isRetrying: true });
    // Simulate a delay before reloading the page
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#fff',
              padding: '30px',
              borderRadius: '8px',
              textAlign: 'center',
              width: '100%',
              maxWidth: '500px',
              boxShadow: 3,
            }}
          >
            <Typography variant='h5' color='error' gutterBottom>
              Oops! Something went wrong.
            </Typography>
            <Typography variant='body1' color='textSecondary' paragraph>
              We encountered an error while loading the content. Please try again or contact support
              if the problem persists.
            </Typography>

            {this.state.isRetrying ? (
              <CircularProgress />
            ) : (
              <Button variant='contained' color='primary' onClick={this.handleRetry}>
                Retry
              </Button>
            )}

            <Box sx={{ marginTop: '20px', textAlign: 'left' }}>
              <Typography variant='body2' sx={{ color: 'red', overflow: 'auto' }}>
                <strong>Error:</strong>{' '}
                {this.state.error ? this.state.error.message : 'Unknown error'}
              </Typography>
              <details style={{ marginTop: '10px' }}>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                  <summary>Stack Trace</summary>
                  <IconButton
                    size='small'
                    onClick={() => {
                      navigator.clipboard.writeText(this.state.errorInfo?.componentStack || '');
                      alert('Stack trace copied to clipboard!');
                    }}
                  >
                    <ContentCopyIcon fontSize='small' /> {/* Copy icon */}
                  </IconButton>
                </Box>
                <Box
                  style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    height: '20vh',
                    overflow: 'scroll',
                  }}
                >
                  <Typography>{this.state.errorInfo?.componentStack}</Typography>
                </Box>
              </details>
            </Box>
          </Box>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
