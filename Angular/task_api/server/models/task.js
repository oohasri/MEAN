const TaskSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {type: String,
                  default: " "},
    completed: {type: Boolean,
                default: false}
}, {timestamps: true });

const Task = mongoose.model('Task', TaskSchema);