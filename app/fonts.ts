import localFont from 'next/font/local';

export const labGrotesqueWeb = localFont({
    variable: '--font-lab-grotesque-web',
    src: [
    {
        path: './fonts/LabGrotesqueWeb-Bold.woff',
    },
    {
        path: './fonts/LabGrotesqueWeb-BoldItalic.woff',
    },
    {
        path: './fonts/LabGrotesqueWeb-Italic.woff',
    },
    {
        path: './fonts/LabGrotesqueWeb-Light.woff',
    },
    {
        path: './fonts/LabGrotesqueWeb-LightItalic.woff',
    },
    {
        path: './fonts/LabGrotesqueWeb-Regular.woff',
    },
]});