const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

function generateGuid(type) {
    return type + "-" + uuidv4();
}
const categoryGuidMap = new Map();

function generateCheckNumberString() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

function generateRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateTransaction() {
    const topLevelCategories = [
        {
            name: 'Auto & Transport',
            categories: ['Auto Insurance', 'Auto Payment', 'Gas', 'Parking', 'Public Transportation', 'Service & Parts'],
        },
        {
            name: 'Bills & Utilities',
            categories: ['Domain Names', 'Fraud Protection', 'Home Phone', 'Hosting', 'Internet', 'Mobile Phone', 'Television', 'Utilities'],
        },
        {
            name: 'Business Services',
            categories: ['Advertising', 'Legal', 'Office Supplies', 'Printing', 'Shipping'],
        },
        {
            name: 'Education',
            categories: ['Books & Supplies', 'Student Loan', 'Tuition'],
        },
        {
            name: 'Entertainment',
            categories: ['Amusement', 'Arts', 'Movies & DVDs', 'Music', 'Newspapers & Magazines'],
        },
        {
            name: 'Fees & Charges',
            categories: ['ATM Fee', 'Banking Fee', 'Finance Charge', 'Late Fee', 'Service Fee', 'Trade Commissions'],
        },
        {
            name: 'Financial',
            categories: ['Financial Advisor', 'Life Insurance'],
        },
        {
            name: 'Food & Dining',
            categories: ['Alcohol & Bars', 'Coffee Shops', 'Fast Food', 'Groceries', 'Restaurants'],
        },
        {
            name: 'Gifts & Donations',
            categories: ['Charity', 'Gift'],
        },
        {
            name: 'Health & Fitness',
            categories: ['Dentist', 'Doctor', 'Eyecare', 'Gym', 'Health Insurance', 'Pharmacy', 'Sports'],
        },
        {
            name: 'Home',
            categories: ['Furnishings', 'Home Improvement', 'Home Insurance', 'Home Services', 'Home Supplies', 'Lawn & Garden', 'Mortgage & Rent'],
        },
        {
            name: 'Income',
            categories: ['Bonus', 'Interest Income', 'Paycheck', 'Reimbursement', 'Rental Income', 'Returned Purchase'],
        },
        {
            name: 'Investments',
            categories: ['Buy', 'Deposit', 'Dividend & Cap Gains', 'Sell', 'Withdrawal'],
        },
        {
            name: 'Kids',
            categories: ['Allowance', 'Baby Supplies', 'Babysitter & Daycare', 'Child Support', 'Kids Activities', 'Toys'],
        },
        {
            name: 'Personal Care',
            categories: ['Hair', 'Laundry', 'Spa & Massage'],
        },
        {
            name: 'Pets',
            categories: ['Pet Food & Supplies', 'Pet Grooming', 'Veterinary'],
        },
        {
            name: 'Shopping',
            categories: ['Books', 'Clothing', 'Hobbies', 'Sporting Goods'],
        },
        {
            name: 'Taxes',
            categories: ['Federal Tax', 'Local Tax', 'Property Tax', 'Sales Tax', 'State Tax'],
        },
        {
            name: 'Transfer',
            categories: ['Credit Card Payment', 'Transfer for Cash Spending', 'Mortgage Payment'],
        },
        {
            name: 'Travel',
            categories: ['Air Travel', 'Hotel', 'Rental Car & Taxi', 'Vacation'],
        },
        {
            name: 'Uncategorized',
            categories: ['Cash', 'Check'],
        },
    ];

    function getRandomCategory() {
        const topLevelCategory = topLevelCategories[Math.floor(Math.random() * topLevelCategories.length)];
        const category = topLevelCategory.categories[Math.floor(Math.random() * topLevelCategory.categories.length)];
        return {
            topLevelCategory: topLevelCategory.name,
            category: category,
        };
    }

    const transactions = [];

    for (let i = 0; i < 1000; i++) {
        const categoryData = getRandomCategory();
        const topLevelCategory = topLevelCategories[Math.floor(Math.random() * topLevelCategories.length)];
        const categoryIndex = Math.floor(Math.random() * topLevelCategory.categories.length);
        const category = topLevelCategory.categories[categoryIndex];

        // Check if the category already has a CategoryGuid
        let categoryGuid;
        if (categoryGuidMap.has(category)) {
            categoryGuid = categoryGuidMap.get(category);
        } else {
            categoryGuid = `${generateGuid('CAT')}`;
            categoryGuidMap.set(category, categoryGuid);
        }

        const transaction = {
            AccountGuid: 'ACT-f4320a42-fe9b-4436-94c3-9a2e206251d5',
            Amount: 0,
            Category: category,
            CategoryGuid: categoryGuid,
            TopLevelCategory: topLevelCategory.name,
            CheckNumberString: generateCheckNumberString(),
            CreatedAt: generateRandomDate(new Date(2022, 0, 1), new Date()),
            CurrencyCode: 'USD',
            Date: new Date(),
            Description: '',
            Guid: generateGuid('TRN'),
            MerchantGuid: generateGuid('MCH'),
            MemberGuid: 'MBR-df109aa7-c070-432f-ab47-39e858eab043',
            UserGuid: 'USR-dddab4ca-a5f4-4c5e-a1bc-a1a69bad100b',
            Status: Math.random() < 0.5 ? 'POSTED' : 'PENDING',
            Type: Math.random() < 0.5 ? 'CREDIT' : 'DEBIT',
        };

        // Set the amount based on the category
        switch (categoryData.category) {
            case 'Auto Insurance':
            case 'Auto Payment':
            case 'Gas':
            case 'Parking':
            case 'Public Transportation':
            case 'Service & Parts':
                transaction.Amount = Math.random() * 200 + 20;
                break;
            case 'Domain Names':
            case 'Fraud Protection':
            case 'Home Phone':
            case 'Hosting':
            case 'Internet':
            case 'Mobile Phone':
            case 'Television':
            case 'Utilities':
                transaction.Amount = Math.random() * 100 + 50;
                break;
            case 'Advertising':
            case 'Legal':
            case 'Office Supplies':
            case 'Printing':
            case 'Shipping':
                transaction.Amount = Math.random() * 300 + 100;
                break;
            case 'Books & Supplies':
            case 'Student Loan':
            case 'Tuition':
                transaction.Amount = Math.random() * 500 + 200;
                break;
            case 'Amusement':
            case 'Arts':
            case 'Movies & DVDs':
            case 'Music':
            case 'Newspapers & Magazines':
                transaction.Amount = Math.random() * 50 + 10;
                break;
            case 'ATM Fee':
            case 'Banking Fee':
            case 'Finance Charge':
            case 'Late Fee':
            case 'Service Fee':
            case 'Trade Commissions':
                transaction.Amount = Math.random() * 10 + 1;
                break;
            case 'Financial Advisor':
            case 'Life Insurance':
                transaction.Amount = Math.random() * 1000 + 200;
                break;
            case 'Alcohol & Bars':
            case 'Coffee Shops':
            case 'Fast Food':
            case 'Groceries':
            case 'Restaurants':
                transaction.Amount = Math.random() * 50 + 5;
                break;
            case 'Charity':
            case 'Gift':
                transaction.Amount = Math.random() * 200 + 10;
                break;
            case 'Dentist':
            case 'Doctor':
            case 'Eyecare':
            case 'Gym':
            case 'Health Insurance':
            case 'Pharmacy':
            case 'Sports':
                transaction.Amount = Math.random() * 300 + 50;
                break;
            case 'Furnishings':
            case 'Home Improvement':
            case 'Home Insurance':
            case 'Home Services':
            case 'Home Supplies':
            case 'Lawn & Garden':
            case 'Mortgage & Rent':
                transaction.Amount = Math.random() * 1000 + 200;
                break;
            case 'Bonus':
            case 'Interest Income':
            case 'Paycheck':
            case 'Reimbursement':
            case 'Rental Income':
            case 'Returned Purchase':
                transaction.Amount = Math.random() * 1000 + 500;
                break;
            case 'Buy':
            case 'Deposit':
            case 'Dividend & Cap Gains':
            case 'Sell':
            case 'Withdrawal':
                transaction.Amount = Math.random() * 10000 + 1000;
                break;
            case 'Allowance':
            case 'Baby Supplies':
            case 'Babysitter & Daycare':
            case 'Child Support':
            case 'Kids Activities':
            case 'Toys':
                transaction.Amount = Math.random() * 50 + 5;
                break;
            case 'Hair':
            case 'Laundry':
            case 'Spa & Massage':
                transaction.Amount = Math.random() * 200 + 20;
                break;
            case 'Pet Food & Supplies':
            case 'Pet Grooming':
            case 'Veterinary':
                transaction.Amount = Math.random() * 100 + 10;
                break;
            case 'Books':
            case 'Clothing':
            case 'Hobbies':
            case 'Sporting Goods':
                transaction.Amount = Math.random() * 200 + 20;
                break;
            case 'Federal Tax':
            case 'Local Tax':
            case 'Property Tax':
            case 'Sales Tax':
            case 'State Tax':
                transaction.Amount = Math.random() * 1000 + 100;
                break;
            case 'Credit Card Payment':
            case 'Transfer for Cash Spending':
            case 'Mortgage Payment':
                transaction.Amount = Math.random() * 500 + 100;
                break;
            case 'Air Travel':
            case 'Hotel':
            case 'Rental Car & Taxi':
            case 'Vacation':
                transaction.Amount = Math.random() * 1000 + 200;
                break;
            case 'Cash':
            case 'Check':
                transaction.Amount = Math.random() * 500 + 50;
                break;
            default:
                transaction.Amount = Math.random() * 100 + 10;
        }

        // Set the description based on the category
        switch (categoryData.category) {
            case 'Auto Insurance':
                transaction.Description = 'Auto insurance premium payment';
                break;
            case 'Auto Payment':
                transaction.Description = 'Auto loan payment';
                break;
            case 'Gas':
                transaction.Description = 'Gasoline purchase';
                break;
            case 'Parking':
                transaction.Description = 'Parking fee';
                break;
            case 'Public Transportation':
                transaction.Description = 'Public transportation fare';
                break;
            case 'Service & Parts':
                transaction.Description = 'Automotive service and parts';
                break;
            case 'Domain Names':
                transaction.Description = 'Domain name registration';
                break;
            case 'Fraud Protection':
                transaction.Description = 'Fraud protection service';
                break;
            case 'Home Phone':
                transaction.Description = 'Home phone bill payment';
                break;
            case 'Hosting':
                transaction.Description = 'Web hosting service payment';
                break;
            case 'Internet':
                transaction.Description = 'Internet service provider bill payment';
                break;
            case 'Mobile Phone':
                transaction.Description = 'Mobile phone bill payment';
                break;
            case 'Television':
                transaction.Description = 'Television service bill payment';
                break;
            case 'Utilities':
                transaction.Description = 'Utility bill payment';
                break;
            case 'Advertising':
                transaction.Description = 'Advertising expenses';
                break;
            case 'Legal':
                transaction.Description = 'Legal services';
                break;
            case 'Office Supplies':
                transaction.Description = 'Office supplies purchase';
                break;
            case 'Printing':
                transaction.Description = 'Printing services';
                break;
            case 'Shipping':
                transaction.Description = 'Shipping fees';
                break;
            case 'Books & Supplies':
                transaction.Description = 'Books and school supplies purchase';
                break;
            case 'Student Loan':
                transaction.Description = 'Student loan payment';
                break;
            case 'Tuition':
                transaction.Description = 'Tuition fee payment';
                break;
            case 'Amusement':
                transaction.Description = 'Amusement park tickets';
                break;
            case 'Arts':
                transaction.Description = 'Art supplies purchase';
                break;
            case 'Movies & DVDs':
                transaction.Description = 'Movie tickets or DVD purchase';
                break;
            case 'Music':
                transaction.Description = 'Music purchase';
                break;
            case 'Newspapers & Magazines':
                transaction.Description = 'Newspaper or magazine subscription';
                break;
            case 'ATM Fee':
                transaction.Description = 'ATM withdrawal fee';
                break;
            case 'Banking Fee':
                transaction.Description = 'Banking service fee';
                break;
            case 'Finance Charge':
                transaction.Description = 'Finance charge';
                break;
            case 'Late Fee':
                transaction.Description = 'Late payment fee';
                break;
            case 'Service Fee':
                transaction.Description = 'Service fee';
                break;
            case 'Trade Commissions':
                transaction.Description = 'Trade commissions';
                break;
            case 'Financial Advisor':
                transaction.Description = 'Financial advisor service';
                break;
            case 'Life Insurance':
                transaction.Description = 'Life insurance premium payment';
                break;
            case 'Alcohol & Bars':
                transaction.Description = 'Alcohol purchase at a bar or restaurant';
                break;
            case 'Coffee Shops':
                transaction.Description = 'Coffee shop purchase';
                break;
            case 'Fast Food':
                transaction.Description = 'Fast food purchase';
                break;
            case 'Groceries':
                transaction.Description = 'Grocery shopping';
                break;
            case 'Restaurants':
                transaction.Description = 'Restaurant meal purchase';
                break;
            case 'Charity':
                transaction.Description = 'Charitable donation';
                break;
            case 'Gift':
                transaction.Description = 'Gift purchase';
                break;
            case 'Dentist':
                transaction.Description = 'Dental services';
                break;
            case 'Doctor':
                transaction.Description = 'Doctor\'s visit';
                break;
            case 'Eyecare':
                transaction.Description = 'Eye care services';
                break;
            case 'Gym':
                transaction.Description = 'Gym membership payment';
                break;
            case 'Health Insurance':
                transaction.Description = 'Health insurance premium payment';
                break;
            case 'Pharmacy':
                transaction.Description = 'Pharmacy purchase';
                break;
            case 'Sports':
                transaction.Description = 'Sports equipment purchase';
                break;
            case 'Furnishings':
                transaction.Description = 'Home furnishings purchase';
                break;
            case 'Home Improvement':
                transaction.Description = 'Home improvement expenses';
                break;
            case 'Home Insurance':
                transaction.Description = 'Home insurance premium payment';
                break;
            case 'Home Services':
                transaction.Description = 'Home services expenses';
                break;
            case 'Home Supplies':
                transaction.Description = 'Home supplies purchase';
                break;
            case 'Lawn & Garden':
                transaction.Description = 'Lawn and garden expenses';
                break;
            case 'Mortgage & Rent':
                transaction.Description = 'Mortgage or rent payment';
                break;
            case 'Bonus':
                transaction.Description = 'Bonus income';
                break;
            case 'Interest Income':
                transaction.Description = 'Interest income';
                break;
            case 'Paycheck':
                transaction.Description = 'Salary paycheck';
                break;
            case 'Reimbursement':
                transaction.Description = 'Expense reimbursement';
                break;
            case 'Rental Income':
                transaction.Description = 'Rental property income';
                break;
            case 'Returned Purchase':
                transaction.Description = 'Returned purchase refund';
                break;
            case 'Buy':
                transaction.Description = 'Investment purchase';
                break;
            case 'Deposit':
                transaction.Description = 'Deposit to investment account';
                break;
            case 'Dividend & Cap Gains':
                transaction.Description = 'Dividends or capital gains';
                break;
            case 'Sell':
                transaction.Description = 'Investment sale';
                break;
            case 'Withdrawal':
                transaction.Description = 'Withdrawal from investment account';
                break;
            case 'Allowance':
                transaction.Description = 'Allowance for kids';
                break;
            case 'Baby Supplies':
                transaction.Description = 'Baby supplies purchase';
                break;
            case 'Babysitter & Daycare':
                transaction.Description = 'Babysitter or daycare expenses';
                break;
            case 'Child Support':
                transaction.Description = 'Child support payment';
                break;
            case 'Kids Activities':
                transaction.Description = 'Kids activities expenses';
                break;
            case 'Toys':
                transaction.Description = 'Toy purchase';
                break;
            case 'Hair':
                transaction.Description = 'Haircut or salon service';
                break;
            case 'Laundry':
                transaction.Description = 'Laundry service';
                break;
            case 'Spa & Massage':
                transaction.Description = 'Spa or massage service';
                break;
            case 'Pet Food & Supplies':
                transaction.Description = 'Pet food and supplies purchase';
                break;
            case 'Pet Grooming':
                transaction.Description = 'Pet grooming service';
                break;
            case 'Veterinary':
                transaction.Description = 'Veterinary services';
                break;
            case 'Books':
                transaction.Description = 'Book purchase';
                break;
            case 'Clothing':
                transaction.Description = 'Clothing purchase';
                break;
            case 'Hobbies':
                transaction.Description = 'Hobby expenses';
                break;
            case 'Sporting Goods':
                transaction.Description = 'Sporting goods purchase';
                break;
            case 'Federal Tax':
                transaction.Description = 'Federal tax payment';
                break;
            case 'Local Tax':
                transaction.Description = 'Local tax payment';
                break;
            case 'Property Tax':
                transaction.Description = 'Property tax payment';
                break;
            case 'Sales Tax':
                transaction.Description = 'Sales tax payment';
                break;
            case 'State Tax':
                transaction.Description = 'State tax payment';
                break;
            case 'Credit Card Payment':
                transaction.Description = 'Credit card payment';
                break;
            case 'Transfer for Cash Spending':
                transaction.Description = 'Transfer for cash spending';
                break;
            case 'Mortgage Payment':
                transaction.Description = 'Mortgage payment';
                break;
            case 'Air Travel':
                transaction.Description = 'Air travel expenses';
                break;
            case 'Hotel':
                transaction.Description = 'Hotel accommodation';
                break;
            case 'Rental Car & Taxi':
                transaction.Description = 'Rental car or taxi expenses';
                break;
            case 'Vacation':
                transaction.Description = 'Vacation expenses';
                break;
            case 'Cash':
                transaction.Description = 'Cash withdrawal';
                break;
            case 'Check':
                transaction.Description = 'Check payment';
                break;
            default:
                transaction.Description = 'Transaction';
        }

        transactions.push(transaction);
    }

    return transactions;

}

const json = JSON.stringify(generateTransaction(), null, 2);
const filePath = 'transactions.json';
console.log(json);
// Write the JSON data to the file
fs.writeFile(filePath, json, 'utf8', (err) => {
    if (err) {
        console.error('Error writing to JSON file:', err);
    } else {
        console.log('JSON file created and data written successfully.');
    }
});

