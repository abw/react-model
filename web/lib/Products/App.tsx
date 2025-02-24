import Info from './Info'
import Layout from './Layout'
import List from './List'
import { Provider } from './Model'

const App = () =>
  <Provider debug={true}>
    <Layout>
      <List/>
      <Info/>
    </Layout>
  </Provider>

export default App