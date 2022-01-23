'use strict'

const {db } = require('../server/db')
const Expense = require('../server/db/models/Expense')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
 const seed = async () => {
  try {
    // console.log(Superhero)
    await db.sync({ force: true });
    await Promise.all(
      createExpenses().map(expense => {
        return Expense.create(expense);
      })
    );
  } catch (err) {
    console.log(err);
  }
};

// creating dummy expenses
function createExpenses() {
  return [
    {
      cost: 58,
      date: "2021-06-20",
      category: "Dining Out",
      vendor: "Lucali"
    },
    {
      cost: 25,
      date: "2021-07-22",
      category: "Alcohol",
      vendor: "Trader Joe's"
    },
    {
      cost: 16,
      date: "2021-08-28",
      category: "Entertainment",
      vendor: "AMC"
    },
    {
      cost: 65,
      date: "2021-09-17",
      category: "Groceries",
      vendor: "Trader Joe's"
    },
    {
      cost: 85,
      date: "2021-10-02",
      category: "Health & Personal Care",
      vendor: "Oskin Med Spa"
    },
    {
      cost: 112,
      date: "2021-11-10",
      category: "Shopping",
      vendor: "Nordstrom"
    },
    {
      cost: 7,
      date: "2021-12-18",
      category: "Snacks & Coffee",
      vendor: "Joe's Pizza"
    },
    {
      cost: 138,
      date: "2021-12-04",
      category: "Dining Out",
      vendor: "Bestia"
    },
    {
      cost: 42,
      date: "2021-06-07",
      category: "Alcohol",
      vendor: "Angel's Share"
    },
    {
      cost: 150,
      date: "2021-07-05",
      category: "Entertainment",
      vendor: "Ticketmaster"
    },
    {
      cost: 39,
      date: "2021-08-29",
      category: "Groceries",
      vendor: "Whole Foods"
    },
    {
      cost: 12,
      date: "2021-09-19",
      category: "Other",
      vendor: "PetSmart"
    },
    {
      cost: 178,
      date: "2021-10-12",
      category: "Shopping",
      vendor: "Cole Haan"
    },
    {
      cost: 9,
      date: "2021-11-01",
      category: "Snacks & Coffee",
      vendor: "Lady M"
    },
    {
      cost: 35,
      date: "2021-12-08",
      category: "Dining Out",
      vendor: "Despana"
    },
    {
      cost: 32,
      date: "2021-06-02",
      category: "Alcohol",
      vendor: "Brooklyn Brewery"
    },
    {
      cost: 30,
      date: "2021-07-20",
      category: "Entertainment",
      vendor: "New York Botanical Garden"
    },
    {
      cost: 28,
      date: "2021-08-14",
      category: "Groceries",
      vendor: "Trader Joe's"
    },
    {
      cost: 30,
      date: "2021-09-01",
      category: "Health & Personal Care",
      vendor: "King Spa"
    },
    {
      cost: 18,
      date: "2021-10-10",
      category: "Snacks & Coffee",
      vendor: "Los Tacos No 1"
    },
    {
      cost: 5,
      date: "2021-11-02",
      category: "Snacks & Coffee",
      vendor: "Boba Guys"
    },
    {
      cost: 45,
      date: "2021-06-03",
      category: "Dining Out",
      vendor: "Luzzo's BK"
    },
    {
      cost: 30,
      date: "2021-07-24",
      category: "Dining Out",
      vendor: "Clark's Restaurant"
    },
    {
      cost: 54,
      date: "2021-08-14",
      category: "Dining Out",
      vendor: "Despana"
    },
    {
      cost: 43,
      date: "2021-09-20",
      category: "Dining Out",
      vendor: "The Islands"
    },
    {
      cost: 34,
      date: "2021-10-10",
      category: "Dining Out",
      vendor: "99 Favor Taste"
    },
    {
      cost: 118,
      date: "2021-11-16",
      category: "Dining Out",
      vendor: "Ohshima Sushi"
    },
    {
      cost: 29,
      date: "2021-12-17",
      category: "Dining Out",
      vendor: "Taco Nazo"
    },
    {
      cost: 20,
      date: "2021-06-30",
      category: "Shopping",
      vendor: "Amazon"
    },
    {
      cost: 33,
      date: "2021-07-28",
      category: "Shopping",
      vendor: "Amazon"
    },
    {
      cost: 87,
      date: "2021-08-25",
      category: "Shopping",
      vendor: "Banana Republic"
    },
    {
      cost: 16,
      date: "2021-09-19",
      category: "Shopping",
      vendor: "Target"
    },
    {
      cost: 23,
      date: "2021-09-01",
      category: "Other",
      vendor: "CVS"
    },
    {
      cost: 13,
      date: "2021-06-12",
      category: "Snacks & Coffee",
      vendor: "Ample Hills Creamery"
    },
    {
      cost: 6,
      date: "2021-07-13",
      category: "Snacks & Coffee",
      vendor: "Chinatown Ice Cream Factory"
    },
    {
      cost: 5,
      date: "2021-08-03",
      category: "Snacks & Coffee",
      vendor: "Gong Cha"
    },
    {
      cost: 13,
      date: "2021-09-22",
      category: "Snacks & Coffee",
      vendor: "Dough"
    },
    {
      cost: 38,
      date: "2021-10-23",
      category: "Groceries",
      vendor: "Trader Joe's"
    },
    {
      cost: 100,
      date: "2021-11-29",
      category: "Groceries",
      vendor: "Whole Foods"
    },
    {
      cost: 64,
      date: "2021-12-29",
      category: "Groceries",
      vendor: "Whole Foods"
    },
    {
      cost: 30,
      date: "2021-06-29",
      category: "Entertainment",
      vendor: "Brooklyn Museum"
    }
  ]}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
