import { createContext, useState } from "react";

export const RemindersContext = createContext({
    reminders: [],
    addReminder: () => {},
    removeReminder: (id) => {}
}); 

function RemindersContextProvider({ children }) {
    const [reminders, setReminders] = useState([]);

    function addReminder() {

    }

    function removeReminder(id) {

    }

    const value = {
        reminders : reminders,
        addReminder: addReminder,
        removeReminder: removeReminder
    };

    return <RemindersContext.Provider value={value}>{children}</RemindersContext.Provider>
}

export default RemindersContextProvider;