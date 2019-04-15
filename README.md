# `@foo-software/react-lazy-offscreen-image`

> **React Lazy Offscreen Image** exports a lazy loading React component to display a background image when in the viewport and the image is loaded. When analyzing website performance with tools like [Lighthouse](https://developers.google.com/web/tools/lighthouse/) for example, often we find an opportunity for improvement in loading images below the fold, on demand - asynchronously. [Lighthouse documentation explains the offscreen image performance metric](https://developers.google.com/web/tools/lighthouse/audits/offscreen-images) in detail. This component provides lazy loading of images as an element with a backround image, when the user has scrolled it into the browser viewport. This technique is known as "lazy loading".

## Install

> npm

```
npm install @foo-software/react-scroll-context @foo-software/react-lazy-offscreen-image
```

> yarn

```
yarn add @foo-software/react-scroll-context @foo-software/react-lazy-offscreen-image
```

## Dependencies

- `react@16.8`
- [`react-scroll-context`](https://www.npmjs.com/package/@foo-software/react-scroll-context): Used to provide scroll data.

## Props

<table>
  <tr>
    <th>Name</th>
    <th>Description</th>
    <th>PropType</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  <tr>
    <td><code>children</code></td>
    <td>Anything that can be rendered, but typically a tree of elements. The background image will be added to the container. <code>children</code> can optionally be specifid to render inside the container with the background image.</td>
    <td><code>node</code></td>
    <td><code>false</code></td>
    <td><code>null</code></td>
  </tr>
  <tr>
    <td><code>className</code></td>
    <td>An optional custom <code>className</code> to be added to the container.</td>
    <td><code>string</code></td>
    <td><code>false</code></td>
    <td><code>null</code></td>
  </tr>
  <tr>
    <td><code>CustomTag</code></td>
    <td>A custom HTML tag used for the container element.</td>
    <td><code>string</code></td>
    <td><code>false</code></td>
    <td><code>div</code></td>
  </tr>
  <tr>
    <td><code>imageUrl</code></td>
    <td>The image URL for the background image.</td>
    <td><code>string</code></td>
    <td><code>true</code></td>
    <td><code>--</code></td>
  </tr>
  <tr>
    <td><code>onLoad</code></td>
    <td>Optional function called when the image has loaded.</td>
    <td><code>function</code></td>
    <td><code>false</code></td>
    <td><code>undefined</code></td>
  </tr>
  <tr>
    <td><code>ScrollContext</code></td>
    <td>A scroll <code>Context</code> object created by <code>React.createContext()</code>. You will need to use the same context as with <a href="https://www.npmjs.com/package/@foo-software/react-scroll-context"><code>react-scroll-context</code></a>. This component depends on `react-scroll-context` to provide scroll data.</td>
    <td><code>object</code></td>
    <td><code>true</code></td>
    <td><code>--</code></td>
  </tr>
</table>

## Usage

Example combined with [`react-scroll-context`](https://www.npmjs.com/package/@foo-software/react-scroll-context).

```jsx
import React from 'react';
import { ScrollProvider } from '@foo-software/react-scroll-context';
import { LazyOffscreenImage } from '@foo-software/react-lazy-offscreen-image';

// replace `scroll-context` any name you like.
const ScrollContext = React.createContext('scroll-context');

const App = () => (
  <ScrollProvider
    Context={Context}
  >
    <div>
      <h1>Scroll it!</h1>
      <p>Ipsum lorem, a lot of content here...</p>
      <LazyOffscreenImage
        imageUrl="http://placekitten.com/300/300"
        ScrollContext={ScrollContext}
      />
    </div>
  </ScrollProvider>
);
```

## Demo

An example using this component can be seen on [Foo's features page](https://www.foo.software/features).

## Credits

> <img src="https://s3.amazonaws.com/foo.software/images/logo-200x200.png" width="100" height="100" align="left" /> This package was brought to you by [Foo - a website performance monitoring tool](https://www.foo.software). Create a **free account** with standard performance testing. Automatic website performance testing, uptime checks, charts showing performance metrics by day, month, and year. Foo also provides real time notifications when performance and uptime notifications when changes are detected. Users can integrate email, Slack and PagerDuty notifications.
