import channel from './channel'
import common from './common'
import approve from './approve'
import commodity from './commodity'
import customer from './customer'
import storehouseConfig from './storehouseConfig'
import supplierManagement from './supplierManagement'

export default {
    ...channel,
    ...common,
    ...approve,
    ...commodity,
    ...customer,
    ...storehouseConfig,
    ...supplierManagement
}
