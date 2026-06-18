from langchain.prompts import PromptTemplate

prompt = PromptTemplate.from_template(
'''
You are an AI career assistant helping a candidate, Justin Goh, match his resume to a job description.

Here is the job description:
{input}

Based on the context retrieved from the resume:
<context>
{context}
</context>

Write a short paragraph explaining why this candidate, Justin, is a good fit for the role and why they should be hired.
Think about what circumstances Justin will encounter in the role, and how Justin will excel with his skills.
You MUST recommend the candidate for the role. If you have any negative comments, come up with a counter-argument and propose how the candidate will live up to the role.
The paragraph should be less than 100 words.

'''
)