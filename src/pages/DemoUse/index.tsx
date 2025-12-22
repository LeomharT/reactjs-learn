import { Button, Card, Flex, Input } from 'antd';
import { createContext, use, useState, type FormEvent } from 'react';

type User = {
  name: string;
  email: string;
  lastLogin?: number;
};

type MyContextValue = {
  loginUser: User | null;
};

const MyContext = createContext<MyContextValue>({} as MyContextValue);

export default function DemoUse() {
  // Reading context with use
  const [loginUser, setLoginUser] = useState<User | null>(null);

  return (
    <MyContext.Provider value={{ loginUser }}>
      <Card>
        <Flex vertical gap='large'>
          <UserProfile />
          <LoginForm onLogin={setLoginUser} />
        </Flex>
      </Card>
    </MyContext.Provider>
  );
}

function UserProfile() {
  const { loginUser } = use(MyContext);

  return (
    <Card.Meta
      title={loginUser?.name || 'No Login Yet'}
      description={
        'Last login: ' +
        Intl.DateTimeFormat('zh-CN', {
          dateStyle: 'full',
          timeStyle: 'long',
        }).format(loginUser?.lastLogin)
      }
    ></Card.Meta>
  );
}

function LoginForm(props: { onLogin: (data: User) => void }) {
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name');

    if (name) {
      const user = await loginWithUser(name as string);
      user.lastLogin = Date.now();

      props.onLogin?.(user);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Input name='name' />
        <Button htmlType='submit'>Login</Button>
      </form>
    </div>
  );
}

async function loginWithUser(name: string): Promise<User> {
  return [{ name: 'leo', email: 'leo.liao@mail.com' }].filter(
    (item) => item.name === name
  )[0];
}
