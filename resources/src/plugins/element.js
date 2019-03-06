import {
    Row,
    Col,
    Input,
    Table,
    TableColumn,
    Pagination,
    Dialog,
    Button,
    DatePicker,
    TimePicker,
    Form,
    FormItem,
    MessageBox,
    Message,
    Tooltip,
    Select,
    Option,
    Upload,
    Menu,
    MenuItem,
    // SubMenu,
    TabPane,
    Submenu,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Tabs,
    Switch,
    Radio,
    RadioGroup,
    Popover,
    Icon
} from 'element-ui'

const components = [
    Row,
    Col,
    Input,
    Table,
    TableColumn,
    Pagination,
    Dialog,
    Button,
    DatePicker,
    TimePicker,
    Form,
    FormItem,
    Tooltip,
    Select,
    Option,
    Upload,
    Menu,
    MenuItem,
    Submenu,
    Tabs,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    TabPane,
    Switch,
    Radio,
    RadioGroup,
    Popover,
    Icon
]

const _MessageBox = MessageBox
const _Message = Message

export default {

    install(Vue) {
        components.forEach(component => Vue.component(component.name, component))
        Vue.prototype.$msgbox = _MessageBox
        Vue.prototype.$message = _Message
    }
}
