import sys
import pickle
import warnings
warnings.filterwarnings('ignore')

model, word_vectorizer = pickle.load(open('python-script\knn_model.pkl', 'rb'))
text=sys.argv[1]
word_features = word_vectorizer.transform([text])
predicted_probabilities = model.predict_proba(word_features)

top_3_indices = predicted_probabilities.argsort(axis=1)[:, -3:][:, ::-1]
top_3_categories = model.classes_[top_3_indices]
top_3_probabilities = predicted_probabilities[0, top_3_indices[0]]

result = []
for j in range(3):
    result.append({"Category": top_3_categories[0, j], "Probability": top_3_probabilities[j]})

print(result)