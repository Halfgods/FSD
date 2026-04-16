const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user');

const runIndexTests = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB for index testing.');

        // Clean up the collection and insert sample data
        await User.deleteMany({});
        
        await User.insertMany([
            { name: "Alice Smith", email: "alice@example.com", age: 25, hobbies: ["reading", "chess"], bio: "Software engineer who loves backend integration.", userId: "1001" },
            { name: "Bob Johnson", email: "bob@example.com", age: 30, hobbies: ["hiking", "swimming"], bio: "Full-stack developer from NY.", userId: "1002" },
            { name: "Charlie Davis", email: "charlie@example.com", age: 25, hobbies: ["chess", "photography"], bio: "A guy who just loves clicking pictures and chess.", userId: "1003" },
            { name: "David Miller", email: "david@example.com", age: 40, hobbies: ["reading", "biking"], bio: "Project manager.", userId: "1004" }
        ]);

        console.log('\n--- Inserted Sample Data ---');

        // Test Single Field Index on name
        console.log('\n--- Testing Single Field Index on "name" ---');
        const nameQueryStats = await User.find({ name: "Alice Smith" }).explain("executionStats");
        console.log(`Execution Time: ${nameQueryStats.executionStats.executionTimeMillis} ms`);
        console.log(`Total Docs Examined: ${nameQueryStats.executionStats.totalDocsExamined}`);
        console.log(`Total Keys Examined: ${nameQueryStats.executionStats.totalKeysExamined}`);
        console.log(`Input Stage: ${nameQueryStats.executionStats.executionStages.inputStage.stage}`); // Should be IXSCAN

        // Test Compound Index on email and age
        console.log('\n--- Testing Compound Index on "email" and "age" ---');
        const compoundQueryStats = await User.find({ email: "bob@example.com", age: 30 }).explain("executionStats");
        console.log(`Execution Time: ${compoundQueryStats.executionStats.executionTimeMillis} ms`);
        console.log(`Total Docs Examined: ${compoundQueryStats.executionStats.totalDocsExamined}`);
        console.log(`Total Keys Examined: ${compoundQueryStats.executionStats.totalKeysExamined}`);

        // Test Multikey Index on hobbies
        console.log('\n--- Testing Multikey Index on "hobbies" ---');
        const hobbiesQueryStats = await User.find({ hobbies: "chess" }).explain("executionStats");
        console.log(`Execution Time: ${hobbiesQueryStats.executionStats.executionTimeMillis} ms`);
        console.log(`Total Docs Examined: ${hobbiesQueryStats.executionStats.totalDocsExamined}`);
        console.log(`Total Keys Examined: ${hobbiesQueryStats.executionStats.totalKeysExamined}`);

        // Test Text Index on bio
        console.log('\n--- Testing Text Index on "bio" ---');
        const textQueryStats = await User.find({ $text: { $search: "developer" } }).explain("executionStats");
        console.log(`Execution Time: ${textQueryStats.executionStats.executionTimeMillis} ms`);
        console.log(`Total Docs Examined: ${textQueryStats.executionStats.totalDocsExamined}`);
        console.log(`Total Keys Examined: ${textQueryStats.executionStats.totalKeysExamined}`);

        // Test Hashed Index on userId
        console.log('\n--- Testing Hashed Index on "userId" ---');
        const hashedQueryStats = await User.find({ userId: "1003" }).explain("executionStats");
        console.log(`Execution Time: ${hashedQueryStats.executionStats.executionTimeMillis} ms`);
        console.log(`Total Docs Examined: ${hashedQueryStats.executionStats.totalDocsExamined}`);
        console.log(`Total Keys Examined: ${hashedQueryStats.executionStats.totalKeysExamined}`);

    } catch (error) {
        console.error('Error during index testing:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB.');
    }
};

runIndexTests();
