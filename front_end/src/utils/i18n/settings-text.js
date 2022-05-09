export const settingsText = {
    "en-US": {
        "Home": "Home",
        "Settings": "Settings",
        "Personal Settings": "Personal Settings",
        "Language Settings": "Language Settings",
        "Appearance Settings": "Appearance Settings",
        "Language": "Language",
        "Save": "Save",
        "Manage my EasyLedgers...": "Manage my EasyLedgers...",

        "Name": "Name",
        "Email": "Email",
        "Permissions": "Permissions",
        "Add user modal header": (organizationName) => `Add a user to ${organizationName}`,
        "Could not find a user registered to this email.": "Could not find a user registered to this email.",
        "Add a user by email:": "Add a user by email:",
        "Permissions for this user": "Permissions for this user",
        "Add": "Add",
        "Cancel": "Cancel",

        "Edit User Privileges": "Edit User Privileges",
        "Remove": "Remove",
        "Are you sure you want to remove this user?": "Are you sure you want to remove this user?",

        "Change Password": "Change Password",
        "Passwords do not match.": "Passwords do not match.",
        "Current password is incorrect.": "Current password is incorrect.",
        "Current Password": "Current Password",
        "New Password": "New Password",
        "Confirm New Password": "Confirm New Password",
        "Take me to the login page!": "Take me to the login page!",
        "Password successfully changed.": "Password successfully changed.",
        "Please log in again.": "Please log in again.",

        "EasyLedger Settings": "EasyLedger Settings",

        "Settings saved.": "Settings saved.",
        "Something went wrong. Please try again later.": "Something went wrong. Please try again later.",
        "Easyledger Name": "Easyledger Name",
        "Currency": "Currency",
        "Fiscal Year Begin Date": "Fiscal Year Begin Date",

        "Add a person": "Add a person",
        "People with access to": (organizationName) => `People with access to ${organizationName}`,
        "Delete this EasyLedger": "Delete this EasyLedger",

        "Yes, delete it!": "Yes, delete it!",
        "Are you sure?": "Are you sure?",
        "Are you sure you want to delete this EasyLedger? This action cannot be undone.": "Are you sure you want to delete this EasyLedger? This action cannot be undone.",
        "Cannot delete this EasyLedger.": "Cannot delete this EasyLedger.",
        "All Journal Entries and Transactions must be deleted before you can delete this EasyLedger.": "All Journal Entries and Transactions must be deleted before you can delete this EasyLedger.",

        "Change Name": "Change Name",
        "Please provide a first and last name.": "Please provide a first and last name.",
        "First name": "First name",
        "Last name": "Last name",

        "Yes, remove this person!": "Yes, remove this person!",
        "Yes, invite this person!": "Yes, invite this person!",
        "Invite this person to myEasyLedger?": "Invite this person to myEasyLedger?",
        "This email address is not registered with myEasyLedger. Invite this person to use myEasyLedger and collaborate on this EasyLedger?": "This email address is not registered with myEasyLedger. Invite this person to use myEasyLedger and collaborate on this EasyLedger?",

        "parseName": (firstName, lastName) => {
            if (firstName != null && lastName != null) {
                return firstName + " " + lastName
            } else {
                return <em>Pending invitation</em>
            }
        },

        "Results per Page": "Results per Page",
        "Number of results to display per page" : "Number of results to display per page",

        "Lock initial values for accounts with journal entries": "Lock initial values for accounts with journal entries",
        "Lock initial values for accounts and categories with transactions": "Lock initial values for accounts and categories with transactions",
        "Lock journal entries before": "Lock journal entries before",
        "Invalid date.": "Invalid date.",
        "This action requires ADMIN permissions for this EasyLedger.": "This action requires ADMIN permissions for this EasyLedger.",
        "This action requires OWN permissions for this EasyLedger.": "This action requires OWN permissions for this EasyLedger.",

        //Appearance settings options
        "System": "System",
        "Light": "Light",
        "Dark": "Dark",
    },
    "zh-TW": {
        "Home": "首頁",
        "Settings": "設定",
        "Personal Settings": "個人設定",
        "Language": "語言",
        "Language Settings": "更改語言",
        "Appearance Settings": "更改光亮模式",
        "Save": "儲存",
        "Manage my EasyLedgers...": "管理我所有的帳本...",

        "Name": "姓名",
        "Email": "電郵",
        "Permissions": "權限",
        "Add user modal header": (organizationName) => `增加一個用戶到 ${organizationName}`,
        "Could not find a user registered to this email.": "找不到以此電郵註册過的現存用戶。",
        "Add a user by email:": "加一個用戶，輸入她（他）的電郵：",
        "Permissions for this user": "給用戶的權限",
        "Add": "加入",
        "Cancel": "取消",

        "Edit User Privileges": "修改用戶權限",
        "Remove": "移除",
        "Are you sure you want to remove this user?": "你確定要移除這個用戶嗎？",

        "Change Password": "更改密碼",
        "Passwords do not match.": "密碼不符",
        "Current password is incorrect.": "密碼不正確",
        "Current Password": "輸入現在的密碼",
        "New Password": "輸入你的新密碼",
        "Confirm New Password": "再打一次新密碼",
        "Take me to the login page!": "帶我到登入頁！",
        "Password successfully changed.": "密碼變更成功。",
        "Please log in again.": "請再次登入。",

        "EasyLedger Settings": "帳本設定",
        "Settings saved.": "設定已儲存。",
        "Something went wrong. Please try again later.": "系統或設定有點問題，請再試一次。",
        "Easyledger Name": "帳本名稱",
        "Currency": "幣別",
        "Fiscal Year Begin Date": "會計年度起始日",

        "Add a person": "加一個用戶",
        "People with access to": (organizationName) => `以下用戶有「${organizationName}」帳本的使用權限：`,
        "Delete this EasyLedger": "删除此帳本",

        "Yes, delete it!": "是的，删除它！",
        "Are you sure?": "你確定嗎？",
        "Are you sure you want to delete this EasyLedger? This action cannot be undone.": "你真的要删除此帳本嗎？",
        "Cannot delete this EasyLedger.": "這個帳本還不能被删除。",
        "All Journal Entries and Transactions must be deleted before you can delete this EasyLedger.": "所有交易記錄都要先删除後，才能删除此帳本。",


        "Change Name": "更改名字",
        "Please provide a first and last name.": "請輸入你的個人姓名稱呼。",
        "First name": "姓",
        "Last name": "名",

        "Yes, remove this person!": "是的，移除此人對本帳本的使用權！",
        "Yes, invite this person!": "是的，確定邀請他（她）！",
        "Invite this person to myEasyLedger?": "邀請此人用 myEasyLedger？",
        "This email address is not registered with myEasyLedger. Invite this person to use myEasyLedger and collaborate on this EasyLedger?": "這個電郵從未在 myEasyLedger 註册過，你是否要邀請他（她）一起共同使用這本帳册？",

        "parseName": (firstName, lastName) => {
            if (firstName !== null && lastName !== null) {
                return firstName + lastName
            } else {
                return <em>仍未完成接受邀請</em>
            } 
        },

        "Results per Page": "更改每頁筆數",
        "Number of results to display per page" : "每頁顯示帳目筆數數量",

        "Lock initial values for accounts with journal entries": "TRANSLATION",
        "Lock initial values for accounts and categories with transactions": "TRANSLATION",
        "Lock journal entries before": "TRANSLATION",
        "Invalid date.": "TRANSLATION",
        "This action requires ADMIN permissions for this EasyLedger.": "TRANSLATION",
        "This action requires OWN permissions for this EasyLedger.": "TRANSLATION",

        //Appearance settings options
        "System": "系統模式",
        "Light": "光亮模式",
        "Dark": "黑暗模式"
    }
}