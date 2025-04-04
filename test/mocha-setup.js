import { use } from 'chai'
import sinonChai from 'sinon-chai'
import chaiRdf from 'mocha-chai-rdf/matchers.js'
import chaiAsPromised from 'chai-as-promised'

use(sinonChai)
use(chaiRdf)
use(chaiAsPromised)
