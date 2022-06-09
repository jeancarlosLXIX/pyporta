from flask import Flask,render_template, request,redirect
import csv
from static.data import projects # bringing the dict 

app = Flask(__name__)

def save_db(data):
    with open('database.txt', 'a') as file:
        file.write(f"\n{data['email']}, {data['subject']}, {data['text']}")

def save_db_csv(data):
    with open('database.csv', mode='a', newline='') as database:
        csv_writer = csv.writer(database, 
        delimiter=',', 
        quotechar='|', 
        quoting=csv.QUOTE_MINIMAL
        )
        txt = data['text'] or 'it does not have text'
        csv_writer.writerow([data['email'], data['subject'], txt])

@app.route('/')
def home():
    return render_template('index.html', title="Welcome")

@app.route('/work.html/<string:project>')
def load_work(project):
    return render_template("test.html", **projects[project])

@app.route('/<string:page_name>') # dinamicly get the name, so we don't have to worry about doing the same prpcess
def html_page(page_name):
    return render_template(f"{page_name}")

@app.route('/submit_form', methods=['GET', 'POST'])
def submit_form():
    if request.method == "POST":
      data = request.form.to_dict() # dictionary with the data sent 
      save_db_csv(data)
      return redirect('thanks.html')

    return 'This is your problem'