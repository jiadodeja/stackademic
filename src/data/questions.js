// ============================================================================
// QUESTION BANK
// ----------------------------------------------------------------------------
// This is the ONLY file you need to edit to add, remove, or change questions.
//
// Each question is an object with:
//   question    - the text shown to the player
//   choices     - an array of exactly 4 answer strings
//   correctIndex- the index (0-3) into `choices` that is correct
//   explanation - a short line shown after the player answers
//
// At the start of every round, the game randomly picks 10 unique questions
// from this list (see src/hooks/useGameState.js -> pickRound()).
// ============================================================================

export const QUESTION_BANK = [
  {
    question: "What technique is primarily used to prevent a neural network from overfitting?",
    choices: ["Dropout", "Tokenization", "Embedding", "Gradient clipping"],
    correctIndex: 0,
    explanation: "Dropout randomly disables neurons during training, forcing the network to not rely too heavily on any single path.",
  },
  {
    question: "What does 'training' a machine learning model actually mean?",
    choices: [
      "Adjusting the model's internal parameters using data",
      "Compressing the model to run faster",
      "Deploying the model to a server",
      "Writing the model's source code",
    ],
    correctIndex: 0,
    explanation: "Training means iteratively adjusting weights/parameters so the model's predictions get closer to the correct answers.",
  },
  {
    question: "What is 'inference' in the context of AI models?",
    choices: [
      "Using a trained model to make predictions on new data",
      "The process of labeling training data",
      "Deleting unused model weights",
      "Randomly initializing a model",
    ],
    correctIndex: 0,
    explanation: "Inference is when a already-trained model is used to generate outputs/predictions for new, unseen inputs.",
  },
  {
    question: "In supervised learning, what is required to train a model?",
    choices: [
      "Labeled data (inputs paired with correct outputs)",
      "Only unlabeled data",
      "A reward signal from an environment",
      "A pre-trained transformer",
    ],
    correctIndex: 0,
    explanation: "Supervised learning uses labeled examples so the model can learn the mapping from input to correct output.",
  },
  {
    question: "What is the main goal of unsupervised learning?",
    choices: [
      "Finding patterns or structure in unlabeled data",
      "Maximizing a reward over time",
      "Fine-tuning a chatbot on human feedback",
      "Predicting a labeled outcome",
    ],
    correctIndex: 0,
    explanation: "Unsupervised learning looks for structure (like clusters or patterns) in data that has no labels.",
  },
  {
    question: "Reinforcement learning trains an agent primarily using what?",
    choices: [
      "Rewards and penalties from interacting with an environment",
      "Labeled training examples",
      "Pre-written rules",
      "Random noise injection",
    ],
    correctIndex: 0,
    explanation: "In reinforcement learning, an agent learns by taking actions and receiving rewards or penalties based on outcomes.",
  },
  {
    question: "Which task is an example of 'classification'?",
    choices: [
      "Sorting emails into 'spam' or 'not spam'",
      "Predicting a house's exact sale price",
      "Generating a paragraph of text",
      "Compressing an image file",
    ],
    correctIndex: 0,
    explanation: "Classification assigns inputs to discrete categories, like spam vs. not spam.",
  },
  {
    question: "Which task is an example of 'regression'?",
    choices: [
      "Predicting a continuous number, like tomorrow's temperature",
      "Sorting images into cat vs. dog",
      "Translating text between languages",
      "Detecting outliers in a dataset",
    ],
    correctIndex: 0,
    explanation: "Regression predicts continuous numeric values rather than discrete categories.",
  },
  {
    question: "What does it mean when a model is 'overfitting'?",
    choices: [
      "It performs well on training data but poorly on new data",
      "It trains too slowly",
      "It uses too little memory",
      "It has too few parameters",
    ],
    correctIndex: 0,
    explanation: "Overfitting happens when a model memorizes training data instead of learning generalizable patterns.",
  },
  {
    question: "What does 'underfitting' mean?",
    choices: [
      "The model is too simple to capture patterns in the data",
      "The model has memorized the training data",
      "The model runs out of GPU memory",
      "The model has too many layers",
    ],
    correctIndex: 0,
    explanation: "Underfitting occurs when a model is too simple to learn the underlying pattern in the data at all.",
  },
  {
    question: "What is the 'bias-variance tradeoff' about?",
    choices: [
      "Balancing a model's simplicity against its sensitivity to training data",
      "Balancing GPU cost against training time",
      "Balancing dataset size against label accuracy",
      "Balancing the number of users against server load",
    ],
    correctIndex: 0,
    explanation: "High bias means a model is too simple (underfits); high variance means it's too sensitive to training data (overfits). Good models balance both.",
  },
  {
    question: "Why is data preprocessing important before training a model?",
    choices: [
      "Clean, consistent data leads to better and more reliable model performance",
      "It makes the code shorter",
      "It is required by law",
      "It removes the need for a model architecture",
    ],
    correctIndex: 0,
    explanation: "Preprocessing (cleaning, normalizing, handling missing values) ensures the model learns from good quality data.",
  },
  {
    question: "What is an 'embedding' in machine learning?",
    choices: [
      "A numeric vector representation of data like words or images",
      "A type of neural network layer that only removes data",
      "A compressed version of a trained model",
      "A hardware accelerator for training",
    ],
    correctIndex: 0,
    explanation: "Embeddings turn data (words, images, etc.) into vectors of numbers that capture meaning or features in a way models can process.",
  },
  {
    question: "What architecture introduced the 'attention' mechanism that powers most modern LLMs?",
    choices: ["The Transformer", "The Perceptron", "The Autoencoder", "The Decision Tree"],
    correctIndex: 0,
    explanation: "The Transformer architecture, introduced in 'Attention Is All You Need' (2017), uses attention as its core mechanism.",
  },
  {
    question: "What does the 'attention' mechanism in a Transformer help a model do?",
    choices: [
      "Weigh how much focus to put on different parts of the input",
      "Delete irrelevant training data",
      "Compress images for faster loading",
      "Encrypt user data",
    ],
    correctIndex: 0,
    explanation: "Attention lets the model dynamically focus on the most relevant parts of the input when producing each output.",
  },
  {
    question: "What is a 'Large Language Model' (LLM)?",
    choices: [
      "A model trained on huge amounts of text to understand and generate language",
      "A database optimized for storing text",
      "A model that only works with images",
      "A rule-based chatbot with no learning involved",
    ],
    correctIndex: 0,
    explanation: "LLMs are trained on massive text datasets and use deep learning (usually Transformers) to understand and generate human-like language.",
  },
  {
    question: "What is an AI 'hallucination'?",
    choices: [
      "When a model confidently generates false or made-up information",
      "When a model crashes during training",
      "When a model runs out of memory",
      "When training data is duplicated",
    ],
    correctIndex: 0,
    explanation: "Hallucinations occur when a model produces plausible-sounding but factually incorrect or fabricated content.",
  },
  {
    question: "What is 'generative AI' primarily used for?",
    choices: [
      "Creating new content like text, images, or audio",
      "Only classifying existing data",
      "Only storing data efficiently",
      "Only encrypting communications",
    ],
    correctIndex: 0,
    explanation: "Generative AI models create new content (text, images, audio, etc.) rather than just analyzing existing data.",
  },
  {
    question: "What is 'tokenization' in natural language processing?",
    choices: [
      "Breaking text into smaller units like words or subwords",
      "Encrypting text for privacy",
      "Translating text into another language",
      "Removing punctuation permanently",
    ],
    correctIndex: 0,
    explanation: "Tokenization splits text into tokens (words, subwords, or characters) that a model can process numerically.",
  },
  {
    question: "What is the main purpose of a neural network's 'activation function'?",
    choices: [
      "Introducing non-linearity so the network can learn complex patterns",
      "Storing the training dataset",
      "Compressing the model size",
      "Connecting to external APIs",
    ],
    correctIndex: 0,
    explanation: "Without non-linear activation functions, a neural network could only learn simple linear relationships.",
  },
  {
    question: "What is a 'convolutional neural network' (CNN) commonly used for?",
    choices: ["Image and visual data processing", "Only text translation", "Only database queries", "Only audio compression"],
    correctIndex: 0,
    explanation: "CNNs use filters that scan across images, making them well-suited for computer vision tasks.",
  },
  {
    question: "What is 'computer vision' as a field of AI?",
    choices: [
      "Teaching computers to interpret and understand images/video",
      "Teaching computers to write code",
      "Teaching computers to play chess only",
      "Teaching computers to manage databases",
    ],
    correctIndex: 0,
    explanation: "Computer vision focuses on enabling machines to interpret visual information from the world, like images and video.",
  },
  {
    question: "What is a common real-world application of natural language processing (NLP)?",
    choices: ["Machine translation between languages", "Predicting stock prices only", "Controlling robotic arms", "Rendering 3D graphics"],
    correctIndex: 0,
    explanation: "NLP powers tasks like translation, sentiment analysis, chatbots, and summarization by helping computers understand human language.",
  },
  {
    question: "Why is a diverse and representative training dataset important for AI fairness?",
    choices: [
      "It helps reduce biased or unfair outcomes across different groups",
      "It makes the model train faster",
      "It reduces the number of parameters needed",
      "It eliminates the need for testing",
    ],
    correctIndex: 0,
    explanation: "Biased or unrepresentative training data can cause a model to perform poorly or unfairly for underrepresented groups.",
  },
  {
    question: "What does 'bias' mean in the context of AI ethics?",
    choices: [
      "Systematic unfairness in a model's predictions toward certain groups",
      "The speed at which a model trains",
      "The number of layers in a neural network",
      "The amount of RAM a model uses",
    ],
    correctIndex: 0,
    explanation: "AI bias refers to a model producing systematically skewed or unfair results, often due to biased training data.",
  },
  {
    question: "What is one common way to evaluate a classification model's performance?",
    choices: ["Accuracy on a held-out test set", "The size of the model file", "The programming language used", "The number of GPUs used"],
    correctIndex: 0,
    explanation: "Accuracy (and related metrics like precision/recall) measured on data the model hasn't seen during training is a standard evaluation method.",
  },
  {
    question: "Why do we split data into training and test sets?",
    choices: [
      "To evaluate how well the model generalizes to unseen data",
      "To make the dataset file smaller",
      "To speed up data preprocessing",
      "Because models require two files to run",
    ],
    correctIndex: 0,
    explanation: "A separate test set lets us measure how well a model performs on data it wasn't trained on, revealing true generalization.",
  },
  {
    question: "What is 'fine-tuning' a pre-trained model?",
    choices: [
      "Further training an existing model on a smaller, specific dataset",
      "Deleting parts of a model to make it smaller",
      "Randomly resetting all model weights",
      "Converting a model to run on a phone",
    ],
    correctIndex: 0,
    explanation: "Fine-tuning takes a model already trained on general data and trains it further on a narrower, task-specific dataset.",
  },
  {
    question: "What is a practical use case for AI in healthcare?",
    choices: [
      "Assisting doctors by analyzing medical images for anomalies",
      "Replacing all doctors immediately",
      "Only scheduling appointments",
      "Only managing hospital billing",
    ],
    correctIndex: 0,
    explanation: "AI is widely used to assist (not replace) medical professionals, such as flagging potential anomalies in scans for review.",
  },
  {
    question: "What does 'GPT' stand for in models like ChatGPT?",
    choices: ["Generative Pre-trained Transformer", "General Purpose Tool", "Graphical Processing Technique", "Global Prediction Test"],
    correctIndex: 0,
    explanation: "GPT stands for Generative Pre-trained Transformer, describing both its generative nature and Transformer-based architecture.",
  },
  {
    question: "What is the purpose of a 'loss function' during training?",
    choices: [
      "Measuring how wrong the model's predictions are, to guide learning",
      "Storing the model's final output",
      "Compressing the dataset",
      "Displaying the user interface",
    ],
    correctIndex: 0,
    explanation: "The loss function quantifies prediction error, and training adjusts the model to minimize this loss over time.",
  },
  {
    question: "What is 'gradient descent' used for in training neural networks?",
    choices: [
      "Iteratively adjusting weights to minimize the loss function",
      "Splitting data into batches",
      "Encrypting model weights",
      "Visualizing the model architecture",
    ],
    correctIndex: 0,
    explanation: "Gradient descent updates model parameters step by step in the direction that reduces the loss.",
  },
  {
    question: "What is a 'chatbot' typically built using in modern AI systems?",
    choices: ["A large language model", "A spreadsheet program", "A relational database only", "A video codec"],
    correctIndex: 0,
    explanation: "Modern chatbots are usually powered by large language models trained to generate conversational responses.",
  },
  {
    question: "In AI, what does 'data labeling' refer to?",
    choices: [
      "Tagging raw data with the correct answers for supervised learning",
      "Compressing data files",
      "Encrypting sensitive data",
      "Deleting duplicate data",
    ],
    correctIndex: 0,
    explanation: "Data labeling assigns correct output tags to raw data so it can be used to train supervised learning models.",
  },
  {
    question: "What is one key risk of deploying AI models without human oversight?",
    choices: [
      "The model may make harmful or incorrect decisions unnoticed",
      "The model will always run out of storage",
      "The model will automatically fix its own bugs",
      "The model will become slower over time",
    ],
    correctIndex: 0,
    explanation: "Without oversight, errors, biases, or harmful outputs from a model may go undetected and cause real-world harm.",
  },
  {
    question: "What is 'few-shot learning' in the context of LLMs?",
    choices: [
      "Giving the model a few examples in the prompt to guide its response",
      "Training a model with only one data point",
      "Reducing the number of layers in a network",
      "Running a model on limited hardware",
    ],
    correctIndex: 0,
    explanation: "Few-shot learning/prompting provides a handful of examples directly in the prompt so the model can infer the desired pattern.",
  },
  {
    question: "What does 'zero-shot learning' mean for an AI model?",
    choices: [
      "The model performs a task it was never explicitly trained or shown examples for",
      "The model requires zero training data ever",
      "The model has zero parameters",
      "The model only works offline",
    ],
    correctIndex: 0,
    explanation: "Zero-shot means the model attempts a new task using only its general knowledge, without task-specific examples.",
  },
  {
    question: "Why might a company choose a smaller AI model over a larger one for a product?",
    choices: [
      "Faster and cheaper inference, especially for simple tasks",
      "Smaller models are always more accurate",
      "Smaller models never make mistakes",
      "Smaller models don't need any training",
    ],
    correctIndex: 0,
    explanation: "Smaller models often run faster and cost less to operate, which can be worth a tradeoff in raw capability for many use cases.",
  },
  {
    question: "What is a common cause of an AI model producing biased results?",
    choices: [
      "The training data reflects historical or societal biases",
      "The model was trained for too many hours",
      "The model has too many GPUs",
      "The code was written in the wrong language",
    ],
    correctIndex: 0,
    explanation: "Models learn patterns from their training data — if that data contains biases, the model can reproduce or amplify them.",
  },
  {
    question: "What is 'model evaluation' used for after training?",
    choices: [
      "Measuring how well the model performs before deploying it",
      "Deleting unused parts of the model",
      "Speeding up the training process",
      "Converting the model to a different programming language",
    ],
    correctIndex: 0,
    explanation: "Evaluation checks a trained model's performance on held-out data to decide if it's ready for real-world use.",
  },
  {
    question: "What is a key difference between AI 'training' and 'inference' in terms of resource use?",
    choices: [
      "Training is typically far more compute-intensive than inference",
      "Inference always requires more compute than training",
      "They require exactly the same amount of compute",
      "Neither requires any computation",
    ],
    correctIndex: 0,
    explanation: "Training involves many passes over large datasets to adjust parameters, which is usually much more compute-intensive than making a single prediction (inference).",
  },
  {
    question: "What does 'natural language processing' (NLP) enable computers to do?",
    choices: [
      "Understand, interpret, and generate human language",
      "Only render 3D graphics",
      "Only manage network traffic",
      "Only perform arithmetic",
    ],
    correctIndex: 0,
    explanation: "NLP is the field focused on enabling computers to work with human language in written or spoken form.",
  },
  {
    question: "Why is 'explainability' important in AI systems, especially in high-stakes fields like medicine or law?",
    choices: [
      "It helps humans understand and trust why a model made a decision",
      "It makes the model train faster",
      "It reduces the size of the dataset needed",
      "It eliminates the need for testing the model",
    ],
    correctIndex: 0,
    explanation: "Explainability allows humans to understand a model's reasoning, which is critical for trust and accountability in high-stakes decisions.",
  },
  {
    question: "What is a 'dataset' in machine learning?",
    choices: [
      "A structured collection of data used to train or evaluate a model",
      "A single prediction made by a model",
      "The code that defines a neural network",
      "A type of GPU used for training",
    ],
    correctIndex: 0,
    explanation: "A dataset is the collection of examples (often with labels) that a model learns from or is tested against.",
  },
  {
    question: "What is 'AI alignment' generally concerned with?",
    choices: [
      "Making sure AI systems act in accordance with human values and intentions",
      "Aligning text in a document",
      "Synchronizing multiple GPUs during training",
      "Formatting code consistently",
    ],
    correctIndex: 0,
    explanation: "AI alignment research focuses on ensuring AI systems behave in ways that match human goals, values, and intentions.",
  },
  {
    question: "What kind of AI application is a recommendation system (like on streaming platforms)?",
    choices: [
      "A system that predicts content a user is likely to enjoy",
      "A system that only blocks spam",
      "A system that only translates languages",
      "A system that only compresses video files",
    ],
    correctIndex: 0,
    explanation: "Recommendation systems use models trained on user behavior data to predict and suggest content a user might like.",
  },
  {
    question: "What is the purpose of a validation set during model development?",
    choices: [
      "Tuning model settings (hyperparameters) without touching the test set",
      "Storing the final deployed model",
      "Replacing the need for a training set",
      "Encrypting the training data",
    ],
    correctIndex: 0,
    explanation: "A validation set is used to tune hyperparameters and check performance during development, keeping the test set truly unseen until final evaluation.",
  },
  {
    question: "What does it mean for an AI model to 'generalize well'?",
    choices: [
      "It performs accurately on new, unseen data, not just training data",
      "It works only on the exact examples it was trained on",
      "It uses the maximum possible number of parameters",
      "It never needs to be retrained",
    ],
    correctIndex: 0,
    explanation: "Good generalization means the model has learned real patterns, not just memorized training examples, so it performs well on new data.",
  },
  {
    question: "What is a 'parameter' in a neural network?",
    choices: [
      "A learnable value (like a weight) adjusted during training",
      "A type of training dataset",
      "A hardware component",
      "A user-facing setting in an app",
    ],
    correctIndex: 0,
    explanation: "Parameters (weights and biases) are the internal values a neural network learns and adjusts during training.",
  },
  {
    question: "Why might an AI chatbot give a confident-sounding but wrong answer?",
    choices: [
      "It generates plausible text patterns, not verified facts",
      "It intentionally lies to users",
      "It has no training data at all",
      "It only repeats exact training examples",
    ],
    correctIndex: 0,
    explanation: "LLMs generate statistically likely text based on patterns, which can sound confident even when factually incorrect (a hallucination).",
  },
  {
    question: "What is 'transfer learning'?",
    choices: [
      "Reusing a model trained on one task as a starting point for a related task",
      "Physically moving a model between servers",
      "Transferring data between two databases",
      "Converting a model from one programming language to another",
    ],
    correctIndex: 0,
    explanation: "Transfer learning leverages knowledge from a model already trained on a related task, saving time and data compared to training from scratch.",
  },
  {
    question: "What is a common way AI is used in self-driving car research?",
    choices: [
      "Using computer vision to detect and classify objects on the road",
      "Only used for playing music in the car",
      "Only used for scheduling maintenance",
      "Only used for billing gas purchases",
    ],
    correctIndex: 0,
    explanation: "Self-driving systems rely heavily on computer vision and sensor fusion to detect pedestrians, vehicles, signs, and lanes.",
  },
  {
    question: "What is the risk of relying entirely on AI-generated content without fact-checking?",
    choices: [
      "Spreading inaccurate or hallucinated information as if it were true",
      "The AI model will delete itself",
      "The content will always be too short",
      "The AI will refuse to generate anything",
    ],
    correctIndex: 0,
    explanation: "Because models can hallucinate, unchecked AI content can spread misinformation if treated as fully reliable without verification.",
  },
  {
    question: "What is a key characteristic of 'deep learning' compared to traditional machine learning?",
    choices: [
      "It uses neural networks with many layers to learn complex patterns automatically",
      "It never requires any training data",
      "It only works on tabular spreadsheet data",
      "It cannot be used for image or text tasks",
    ],
    correctIndex: 0,
    explanation: "Deep learning uses multi-layered ('deep') neural networks that can automatically learn complex hierarchical features from raw data.",
  },
  {
    question: "What does 'batch size' refer to during model training?",
    choices: [
      "The number of training examples processed before updating the model",
      "The total number of layers in the model",
      "The number of GPUs required",
      "The final size of the trained model file",
    ],
    correctIndex: 0,
    explanation: "Batch size is how many training examples are processed together before the model's parameters are updated once.",
  },
  {
    question: "Why is 'prompt engineering' useful when working with LLMs?",
    choices: [
      "Well-crafted prompts can significantly improve the quality of model outputs",
      "It changes the model's underlying training data permanently",
      "It is required to install the model",
      "It replaces the need for any training data",
    ],
    correctIndex: 0,
    explanation: "How a prompt is phrased and structured can strongly influence the quality and relevance of an LLM's response.",
  },
  {
    question: "What is one ethical concern related to AI-generated deepfakes?",
    choices: [
      "They can be used to spread convincing but fake media of real people",
      "They always use less data than real videos",
      "They are only usable for scientific research",
      "They require no computing power to create",
    ],
    correctIndex: 0,
    explanation: "Deepfakes use AI to create highly realistic but fabricated images, video, or audio, raising concerns about misinformation and consent.",
  },
];
