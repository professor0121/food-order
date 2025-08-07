import mongoose from 'mongoose';

const mealSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        enum:['vegetarian', 'non-vegetarian', 'vegan'],
        default:'vegetarian'
    },
    items:[{
        type:String,
        required:true
    }],
    price:{
        type:Number,
        required:true
    },
    specialToday:{
        type:String,
        default:"No special today"
    },
    image:{
        type:String
    },

},{ timestamps: true });

const Meal= mongoose.model('Meal', mealSchema);
export default Meal;