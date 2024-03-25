import { Component, OnDestroy, inject } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { FormsModule } from '@angular/forms';
import { ChatMessage, ChatService } from '../../services/chat.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnDestroy{
  name = '';
  chatService = inject(ChatService);
  messages: ChatMessage[] = [];
  msgToSend = '';
  messagesSubscription?: Subscription;
  greetingsSubscription?: Subscription;

  connect(){
    this.chatService.connect().pipe(
      tap(ok => {
        if (ok) {
          this.listenEndpoints();
          this.chatService.sendName(this.name);
        }
      })
    ).subscribe(ok => {
      console.log("!!! Connected");
    });
  }

  listenEndpoints() {
    this.messagesSubscription = this.chatService.listenMessages().subscribe(message => {
      this.messages = [...this.messages, message];
    });
    this.greetingsSubscription = this.chatService.listenGreetings().subscribe(message => {
      this.messages = [...this.messages, message];
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.msgToSend);
  }

  disconnect() {
    this.messagesSubscription?.unsubscribe();
    this.greetingsSubscription?.unsubscribe();
    console.log("!!! Disconnecting");
    this.chatService.disconnect();
  }

  ngOnDestroy(): void {
    this.disconnect();   
  }
}
