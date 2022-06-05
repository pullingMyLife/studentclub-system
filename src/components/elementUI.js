// import Vue from 'vue';

// 按需引入 Element 组件  element.js
import {
    Dialog,
    Button,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    FormItem,
    Input,
    Select,
    Option,
    Col,
    DatePicker,
    TableColumn,
    MessageBox,
    Message,
    Form,
    Table,
    Pagination,
    Submenu,
    MenuItemGroup,
    Drawer,
    Row,
    Upload,
    Checkbox,
    Notification,
    Loading,
} from 'element-ui'

let elementUIs = [Dialog, Button, Dropdown, DropdownMenu, DropdownItem, Menu, MenuItem, Breadcrumb, BreadcrumbItem, FormItem, Input, Select, Option, Col, DatePicker, TableColumn, Form, Table, Pagination, Submenu, MenuItemGroup, Drawer, Row, Upload, Checkbox,Loading]

export default function(Vue){
    elementUIs.forEach(elementUI => [
        // Vue.component(elementUI.name, elementUI)
        Vue.use(elementUI) // 也可以使用 Vue.use()
    ]);

    //引入弹窗组件和提示框组件
    Vue.prototype.$message = Message;  //弹框
    Vue.prototype.$alert = MessageBox;  //对话框组件
    Vue.prototype.$confirm = MessageBox.confirm; //点击空白处关闭对话框

}
        