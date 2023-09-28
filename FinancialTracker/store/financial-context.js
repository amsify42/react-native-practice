import { createContext, useState } from "react";

export const FinancialContext = createContext({
    items: [],
    addItem: () => {},
    removeRemove: (id) => {}
}); 

const financials = [
    {
        id: 1,
        type: 'pay',
        title: 'Chitti'
    },
    {
        id: 1,
        type: 'receive',
        title: 'Nani Capital'
    },
];

function FinancialContextProvider({ children }) {
    const [items, setItems] = useState(financials);

    function addItem() {

    }

    function removeRemove(id) {

    }

    const value = {
        items : items,
        addItem: addItem,
        removeRemove: removeRemove
    };

    return <FinancialContext.Provider value={value}>{children}</FinancialContext.Provider>
}

export default FinancialContextProvider;