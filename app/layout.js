import './globals.css';

export const metadata = {
  title: 'HMT | Engineered for Precision',
  description: 'Cinematic industrial hero landing page for Hindustan Machine Tools.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
