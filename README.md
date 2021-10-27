
# 🛠 VUTTR

## 🤔 Sobre o projeto
<hr>
Um simples aplicativo web de lembranças de ferramentas utilizando Django.

## ✨ Demonstração
Veja abaixo um gif do projeto.<br>
[![Image from Gyazo](https://i.gyazo.com/4d54cb4e44000648ff3aa63ebdd55615.gif)](https://gyazo.com/4d54cb4e44000648ff3aa63ebdd55615)

## Iniciar projeto
<hr>

Depois de clonar o repositório, você deseja criar um ambiente virtual, para ter uma instalação limpa do Python. Você pode fazer isso executando o comando

```
python -m venv env
```
Depois disso, é necessário ativar o ambiente virtual.

Você pode instalar todas as dependências necessárias executando
```
pip install -r requirements.txt
```

Definir banco de dados (verifique se você está no mesmo diretório que o manage.py)
```
python manage.py makemigrations
```
```
python manage.py migrate
```
Criar o SuperUser 
```
python manage.py createsuperuser
```

Após todas essas etapas, você pode começar a testar este projeto usando o comando.
```
python manage.py runserver
```
