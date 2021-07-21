import * as React from 'react';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import Main from 'infrastructure/components/Main/MainComponent';

let theme = createTheme({
    palette: {
        primary: {
            light: '#6AB972',
            main: '#569B51',
            dark: '#4F934A',
            contrastText: '#FFF',
        },
        secondary: {
            light: '#FFFFFF',
            main: '#F0F0F0',
            dark: '#CDCDCD',
            contrastText: '#000',
        },
        error: {
            main: '#E84545',
            dark: '#D32F2F',
            contrastText: '#FFF',
        },
        warning: {
            main: '#F0A500',
            dark: '#F48B29',
            contrastText: '#FFF',
        },
    },
    typography: {
        fontFamily: 'Montserrat, sans-serif',
        h4: {
            fontWeight: "bold"
        },
        subtitle1: {
            // fontFamily: 'Montserrat, sans-serif',
            fontSize: 20,
            fontWeight: 'bold'
        },
    }
});
theme = responsiveFontSizes(theme);

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Main></Main>
        </ThemeProvider>
    );
}

export default App;
